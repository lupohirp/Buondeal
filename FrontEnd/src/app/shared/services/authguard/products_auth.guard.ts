
import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../security/authorization.service';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { User, Partner, Product } from 'src/app/app.models';
import { EncoderService } from '../encoding/encoder.service';
import { untilDestroyed } from 'ngx-take-until-destroy';


@Injectable()
export class ProductsAuthGuard implements CanActivate, OnDestroy {


    constructor(private router: Router, private authorizationService: AuthorizationService, private _http: HttpService, private _encoderService: EncoderService, private _activatedRoute: ActivatedRoute) { }

    canActivate(route: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {

        const passed_data = state.root.queryParams['data'];


        if (!passed_data || passed_data == null || passed_data === '') {
            return new Observable<boolean>((observer) => {

                observer.next(true);
                observer.complete;
            });
        }

        const product: Product = <Product>JSON.parse(atob(passed_data));


        if (this.authorizationService.isAuthenticated() && this.authorizationService.getUser().id === product.userid) {
            // double check

            const params = {
                'username': this.authorizationService.getUser().username,
                'password': this.authorizationService.getUser().password
            };

            return new Observable<boolean>((observer) => {

                this._http.sendGetReqeust(environment.backend_url + 'api/v1/users/', params).pipe(untilDestroyed(this)).subscribe(response => {
                    if (response && response) {
                        if (response.id) {
                            observer.next(true);
                            observer.complete;
                        } else {
                            this.authorizationService.deleteCookies();
                            this.router.navigate(['/sign-in']);
                            observer.next(false);
                            observer.complete;
                        }
                    } else {
                        this.authorizationService.deleteCookies();
                        this.router.navigate(['/sign-in']);
                        observer.next(false);
                        observer.complete;
                    }
                },
                    error => {
                        this.authorizationService.deleteCookies();
                        this.router.navigate(['/sign-in']);
                        observer.next(false);
                        observer.complete;
                    }
                );
            });
        } else {
            return new Observable<boolean>((observer) => {
                this.authorizationService.deleteCookies();
                this.router.navigate(['/sign-in']);
                observer.next(false);
                observer.complete;
            });
        }
    }
    ngOnDestroy() {
        console.log('Component Destroyed');
    }
}
