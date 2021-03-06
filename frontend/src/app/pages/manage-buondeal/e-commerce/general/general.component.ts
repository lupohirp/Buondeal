import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { environment } from 'src/environments/environment';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Category, Subcategory } from 'src/app/app.models';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Subscription, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';




@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {

  @Input('formGroup') generalFormGroup;
  @Output()
  loadVariants = new EventEmitter();


  category_list: Array<Category> = [];
  subcategory_list: Array<Subcategory> = [];
  public Editor = ClassicEditor;
  smallScreen: boolean;

  constructor(private _http: HttpService, private _snackbar: MatSnackBar, private _breakpointObserver: BreakpointObserver) {
    _breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  ngOnInit() {
    this._http.sendGetReqeust(environment.backend_url + 'api/v1/anag_categories/', {}, true).pipe(untilDestroyed(this)).subscribe(
      result => {
        this.category_list = result;
      },
      error => {
        this._snackbar.open('Errore Generico', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        console.log(error);
      });
  }

  emitEvent() {
    this.loadVariants.emit();
  }


  loadSubcategories($category_id) {

    const params = {
      'cat_id': $category_id
    };

    this._http.sendGetReqeust(environment.backend_url + 'api/v1/anag_subcategories/', params, true).pipe(untilDestroyed(this)).subscribe(
      result => {
        this.subcategory_list = result;
      },
      error => {
        this._snackbar.open('Errore Generico', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        console.log(error);
      });

  }



  ngOnDestroy(): void {

  }

}
