import { Component, OnInit, ViewChild, OnDestroy, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { AppService } from '../../../app.service';
import { Variant, Variants_Details, Images, Deal } from '../../../app.models';
import { emailValidator } from '../../../theme/utils/app-validators';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { environment } from 'src/environments/environment';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Meta, Title } from '@angular/platform-browser';
import { ProductZoomComponent } from '../../products/product/product-zoom/product-zoom.component';
import { CounterService } from 'src/app/shared/services/counter/counter.service';
declare var $: any;

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit, OnDestroy {

  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;

  public config: SwiperConfigInterface = {};
  public deal: Deal;
  public variant: Variant;
  public image: any;
  public zoomImage: any;
  public form: FormGroup;
  public relatedDeals: Array<Deal>;
  public arrayOfMapVariants: Array<any> = [];
  public mapVariant: Object;

  public variantSelect = [];

  public chosen_variants = [];
  public disableButtons = true;


  constructor(private cd: ChangeDetectorRef, public appService: AppService, private _http: HttpService, public dialog: MatDialog, private activatedRoute: ActivatedRoute, public formBuilder: FormBuilder, public _snackbar: MatSnackBar, private _counterService: CounterService, private meta: Meta, private title: Title) {
  }

  ngOnInit() {

    const params = {
      'deal_id': this.activatedRoute.snapshot.params['id']
    };

    this._http.sendGetReqeust(environment.backend_url + 'api/v1/deals/', params, true).pipe(untilDestroyed(this)).subscribe(
      result => {

        this.deal = result;

        if (this.deal.variants[0].images && this.deal.variants[0].images.length > 0) {
          this.image = this.deal.variants[0].images[0].image_path;
          this.zoomImage = this.deal.variants[0].images[0].zoomed_path;
        }

        if (this.deal.variants) {
          this.mapVariant = {};


          for (const i in this.deal.variants) {
            let variant_object = {};
            variant_object['id'] = this.deal.variants[i].variant_id;
            variant_object['description'] = "";
            for (const l in this.deal.variants[i].variant_details) {
              variant_object['description'] += this.deal.variants[i].variant_details[l].name + ":" + this.deal.variants[i].variant_details[l].title + "/";
            }

            variant_object['description'] = variant_object['description'].substring(variant_object['description'], variant_object['description'].length - 1);
            this.arrayOfMapVariants.push(variant_object);
            this.deal.variants[i].end_variant_date_as_date = new Date(Number(this.deal.variants[i].end_variant_date));
            this.deal.variants[i].start_variant_date_as_date = new Date(this.deal.variants[i].start_variant_date);

          }
        }

        this.form = this.formBuilder.group({
          'review': [null, Validators.required],
          'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
          'email': [null, Validators.compose([Validators.required, emailValidator])]
        });

        if (this.deal.seo.length > 0 && this.deal.seo[0].seo_description != '') {
          this.meta.updateTag(
            {
              name: 'description', content: this.deal.seo[0].seo_description
            }
          );
        } else {
          this.meta.updateTag(
            {
              name: 'description', content: this.deal.description
            }
          );
        }

        if (this.deal.seo.length > 0 && this.deal.seo[0].seo_title != '') {
          this.title.setTitle("Buondeal - " + this.deal.seo[0].seo_title);
        } else {
          this.title.setTitle("Buondeal - " + this.deal.title);
        }
      }, () => {
        this._snackbar.open('Errore generico', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });


    this.getRelateddeals();
  }

  ngAfterViewInit() {
    this.config = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        }
      }
    };
  }

  public getRelateddeals() {
    this.appService.getProducts('related').pipe(untilDestroyed(this)).subscribe(data => {
      this.relatedDeals = data;
    });
  }

  public selectImage(image) {
    this.image = image.image_path;
    this.zoomImage = image.zoomed_path;
  }

  public goToUrl(url: string) {
    if (url.indexOf("http") < 0) {
      url = "http://" + url;
    }
    window.open(url, "_blank");
  }


  public selectedVariant(id) {

    if (id) {
      this.disableButtons = false;
    }

    this.deal.variants.forEach(variant => {
      if (variant.variant_id === id) {
        this.variant = variant;

        let resized_images = new Array();


        this.deal.images = variant.images;
        this._counterService.countdown(this.variant.end_variant_date_as_date);
      }
    });
  }


  public onMouseMove(e) {
    if (window.innerWidth >= 1280) {
      let image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX / image.offsetWidth * 100;
      y = offsetY / image.offsetHeight * 100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if (zoomer) {
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = 'block';
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }


  public getImagePath(imgPath: Images, index: number) {
    $('.p-link').removeClass('border-active');
    this.image = imgPath.image_path;
    $('#' + index + '_img').addClass('border-active');
  }

  public onMouseLeave() {
    this.zoomViewer.nativeElement.children[0].style.display = 'none';
  }

  public openZoomViewer() {
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  toHTML(input): any {
    return new DOMParser().parseFromString(input, 'text/html').documentElement.textContent;
  }

  ngOnDestroy() {
    this.title.setTitle("Buondeal");
    this.meta.updateTag({ name: 'description', content: 'Benvenuti su Buondeal.com! Il negozio pieno di coupon e offerte!' });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      // email sent
    }
  }
}
