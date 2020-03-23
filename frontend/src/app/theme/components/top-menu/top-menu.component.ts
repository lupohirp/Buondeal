import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../../app.service';
import { AuthorizationService } from 'src/app/shared/services/security/authorization.service';
import { Router } from '@angular/router';
import { User } from 'src/app/app.models';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {


  constructor(public appService: AppService, private _authorizationService: AuthorizationService, private router: Router) { }

  ngOnInit() {

  }

  public getLoggedUser() {
    return this._authorizationService.getUser();
  }

  public isLoggedIn() {
    return this._authorizationService.isAuthenticated();
  }

  public logout() {
    this._authorizationService.deleteCookies();
    this.router.navigate(['/']);
  }

}
