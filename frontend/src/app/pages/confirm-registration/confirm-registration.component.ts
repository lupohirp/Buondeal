import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { environment } from 'src/environments/environment';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent implements OnInit, OnDestroy {

  public hideComponents = false;
  public hideConfirmationSuccesful = true;

  constructor(private router: Router, private route: ActivatedRoute, private _http: HttpService) { }

  ngOnInit() {
    if (this.route.snapshot.queryParamMap['params']) {
      const paramMap = this.route.snapshot.queryParamMap['params'];
      if (paramMap['key']) {

        this.hideComponents = true;

        const params = {
          'key': paramMap['key']
        };

        this._http.sendGetReqeust(environment.backend_url + 'api/v1/confirm/', params).pipe(untilDestroyed(this)).subscribe(
          result => {
            if (result) {
              this.hideConfirmationSuccesful = false;
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 5000);
            } else {
              this.router.navigate(['/']);
            }
          },
          error => {
          }
        );

      } else {
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 5000);
      }
    }


  }

  ngOnDestroy() {
    console.log('Component Destroyed');
  }

}
