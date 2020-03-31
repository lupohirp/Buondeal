import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { AuthorizationService } from 'src/app/shared/services/security/authorization.service';
import { environment } from 'src/environments/environment';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { EncoderService } from 'src/app/shared/services/encoding/encoder.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';


@Component({
  selector: 'app-manage-buondeal',
  templateUrl: './manage-buondeal.component.html',
  styleUrls: ['./manage-buondeal.component.scss']
})
export class ManageBuondealComponent implements OnInit, OnDestroy, AfterViewInit {

  // TODO: AuthGuard per i figli per fare controlli!!!!!!!!

  displayedColumns: string[] = ['title', 'categories', 'start_sold_date', 'actions'];

  // Paginatore
  @ViewChild('soldPaginator') soldPaginator: MatPaginator;
  @ViewChild('dealsPaginator') dealsPaginator: MatPaginator;

  public config: SwiperConfigInterface = {};


  dataSource;
  dealsDataSource;
  emptySoldObject;
  emptyDealsObject;
  selledObjects;
  dealsObjects;
  operation_title;

  smallScreen: boolean;
  deals;
  products;


  public links = [
    { name: 'Vendita Prodotti', href: 'sell', icon: 'local_grocery_store' },
    { name: 'Deal/Coupon', href: 'deals', icon: 'local_offer' },
    { name: 'Eventi', href: 'events', icon: 'event' },

  ];

  constructor(private _router: Router, private _http: HttpService, private _authService: AuthorizationService, private _snackbar: MatSnackBar, private _spinner: NgxSpinnerService, private _encoderService: EncoderService, private _breakpointObserver: BreakpointObserver) {
    _breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }
  ngAfterViewInit(): void {
    this.config = {
      observer: true,
      slidesPerView: 6,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: true,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 1,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 5,
        }
      }
    };
  }

  ngOnInit() {
    this.loadSoldObjects();
    this.loadDealsObjects();
  }

  goTo(url: string) {
    this._router.navigate(['manage-buondeal/' + url]);
    if (url === 'sell') {
      this.operation_title = 'Fornisci i seguenti dati per la vendita'
    }
  }

  goBack() {
    this._router.navigate(['manage-buondeal/']);
    this.loadSoldObjects();
  }

  public hideComponents() {
    return (this._router.url === '/manage-buondeal/sell' ||
      this._router.url.indexOf('/manage-buondeal/sell') >= 0 ||
      this._router.url === '/manage-buondeal/deals' ||
      this._router.url.indexOf('/manage-buondeal/deals') >= 0 ||
      this._router.url === '/manage-buondeal/' ||
      this._router.url === '/manage-buondeal/sell/success' ||
      this._router.url === '/manage-buondeal/sell/error');
  }

  public hideFABbackButton() {

    if (this._router.url !== '/manage-buondeal' && this._router.url !== '/manage-buondeal/sell/success' && this._router.url !== '/manage-buondeal/sell/error') {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    console.log('Component Destroyed');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  applyFilterMobile(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.products = this.dataSource.filteredData;
  }

  applyFilterDeals(filterValue: string) {
    this.dealsDataSource.filter = filterValue.trim().toLowerCase();
    if (this.dealsDataSource.paginator) {
      this.dealsDataSource.paginator.firstPage();
    }
  }

  applyFilterDealsMobile(filterValue: string) {
    this.dealsDataSource.filter = filterValue.trim().toLowerCase();
    if (this.dealsDataSource.paginator) {
      this.dealsDataSource.paginator.firstPage();
    }

    this.deals = this.dealsDataSource.filteredData;
  }

  loadSoldObjects() {
    const params = {
      'userid': this._authService.getUser().id
    };
    this._http.sendGetReqeust(environment.backend_url + 'api/v1/products/', params, true).pipe(untilDestroyed(this)).subscribe(
      result => {
        if (result.length === 0) {
          this.emptySoldObject = true;
        } else {
          result.sort((val1, val2) => {
            return new Date(val2.start_sold_date).getTime() - new Date(val1.start_sold_date).getTime();
          });
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.soldPaginator;
          this.selledObjects = result.length;
          this.products = result;
        }
      },
      error => {
        this._snackbar.open('Errore Generico', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        console.log(error);
      });
  }


  loadDealsObjects() {
    const params = {
      'userid': this._authService.getUser().id
    };
    this._http.sendGetReqeust(environment.backend_url + 'api/v1/deals/', params, true).pipe(untilDestroyed(this)).subscribe(
      result => {
        if (result.length === 0) {
          this.emptyDealsObject = true;
        } else {
          result.sort((val1, val2) => {
            return new Date(val2.start_sold_date).getTime() - new Date(val1.start_sold_date).getTime();
          });
          this.dealsDataSource = new MatTableDataSource(result);
          this.dealsDataSource.paginator = this.dealsPaginator;
          this.dealsObjects = result.length;
          this.deals = result;

        }
      },
      error => {
        this._snackbar.open('Errore Generico', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        console.log(error);
      });
  }



  viewProduct($element) {
    this._router.navigate(['/products/' + $element.id]);
  }

  viewDeal($element) {
    this._router.navigate(['/deals/' + $element.id]);
  }

  editProduct($element) {
    this._router.navigate(['/manage-buondeal/sell', { product: btoa($element.id) }]);
  }

  deleteProduct($element) {

    const params = {
      'id': $element.id,
      'typeOp': 3
    };

    this._http.sendPostReqeust(environment.backend_url + 'api/v1/products/', params, true).pipe(untilDestroyed(this)).subscribe(
      result => {
        this.emptySoldObject = false;
        this.dataSource = undefined;
        this.loadSoldObjects();
      },
      error => {
        this._snackbar.open('Errore Generico', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        console.log(error);
      });
  }
}
