import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/app.models';
import { AuthorizationService } from 'src/app/shared/services/security/authorization.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user: User;


  constructor(private _authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.user = this._authorizationService.getUser();
  }

}
