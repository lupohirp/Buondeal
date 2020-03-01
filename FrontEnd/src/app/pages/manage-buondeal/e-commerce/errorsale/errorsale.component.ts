import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-errorsale',
  templateUrl: './errorsale.component.html',
  styleUrls: ['./errorsale.component.scss']
})
export class ErrorsaleComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  public onReturn() {
    this._router.navigate(['/manage-buondeal']);
  }


}
