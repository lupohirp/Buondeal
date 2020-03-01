import { Injectable, EventEmitter } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/shared/services/security/authorization.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService, private _router: Router, private _authorizationService: AuthorizationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinner.show();

    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.spinner.hide();
      }
    }, (err: any) => {
      this.spinner.hide();
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401 || err.status == 403) {
          this._authorizationService.deleteCookies();
          this._router.navigate(['/sign-in']);
        }
        // debugger;
      }
    });
  }
}
