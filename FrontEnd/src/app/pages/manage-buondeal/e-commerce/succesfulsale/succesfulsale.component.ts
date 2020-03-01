import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-succesfulsale',
  templateUrl: './succesfulsale.component.html',
  styleUrls: ['./succesfulsale.component.scss']
})
export class SuccesfulsaleComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() { }

  public onReturn() {
    this._router.navigate(['/manage-buondeal']);
  }

}
