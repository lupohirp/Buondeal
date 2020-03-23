import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from '../security/authorization.service';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { User, Partner } from 'src/app/app.models';
import { EncoderService } from '../encoding/encoder.service';
import { untilDestroyed } from 'ngx-take-until-destroy';


@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {


  constructor(private router: Router, private authorizationService: AuthorizationService, private _http: HttpService, private _encoderService: EncoderService) { }

  canActivate(route: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {
    if (this.authorizationService.isAuthenticated()) {
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
      this.authorizationService.deleteCookies();
      this.router.navigate(['/sign-in']);
      return false;
    }
  }

  canActivateChild(childRoute: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {
    if (this.authorizationService.isAuthenticated()) {
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
      this.authorizationService.deleteCookies();
      this.router.navigate(['/sign-in']);
      return false;
    }
  }


  ngOnDestroy() {
    console.log('Component Destroyed');
  }
}
