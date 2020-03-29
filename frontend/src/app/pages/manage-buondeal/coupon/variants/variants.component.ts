import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { checkCurrentPriceandDiscountPrice } from 'src/app/theme/utils/app-validators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { NgxPicaService, NgxPicaErrorInterface, NgxPicaResizeOptionsInterface } from '@digitalascetic/ngx-pica';
import differenceBy from 'lodash/differenceBy';
import { WrongFileDialogComponent } from '../../e-commerce/wrong-file-dialog/wrong-file-dialog.component';
import { ImagesInfoDialogComponent } from '../../e-commerce/images-info-dialog/images-info-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-variants-coupon',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.scss']
})
export class VariantsCouponComponent implements OnInit, OnDestroy {



  @Input('formGroup') generalFormGroup;
  @Input('anagVariants') anag_variants;

  variants: FormArray;
  variantsSpecifications: FormArray;
  numberOfVariants: number = 0;
  selectedFile: File;
  ArrayOfSelectedFile = new Array<any>();
  selectedVariants: { [x: number]: any } = {};
  selectableVariants: { [x: number]: any } = {};

  minDate = new Date();

  mapDisabledVariants = {};
  alreadyVariantsLoaded: boolean = false;

  smallScreen: boolean;


  constructor(private _formBuilder: FormBuilder, private _ngxPicaService: NgxPicaService, private _dialog: MatDialog, private _breakpointObserver: BreakpointObserver) {
    _breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });

  }

  ngOnInit() {

    const formArray: FormArray = this.generalFormGroup.get('variants');

    if (formArray.getRawValue().length === 0) {
      this.addVariant(0);
    }
  }



  addVariant(i: number) {


    this.variants = this.generalFormGroup.get('variants') as FormArray;
    let itemCreated = this.createItem();

    let variantSpecification = itemCreated.get('specifications') as FormArray;
    variantSpecification.push(this.createSpecificationItem());

    this.variants.push(itemCreated);

    this.numberOfVariants = i;
    this.selectedVariants[i] = new Array<any>();
    this.selectableVariants[i] = new Array<any>();
    this.selectableVariants[i][0] = this.anag_variants;

    this.mapDisabledVariants[i] = new Array<any>();
    this.mapDisabledVariants[i][0] = false;

  }

  addVariantSpecification(i: number) {

    let variants = this.generalFormGroup.get('variants') as FormArray;
    let variantSpecification = variants.controls[i].get('specifications') as FormArray;
    variantSpecification.push(this.createSpecificationItem());
  }

  removeVariantSpecification(i: number, j: number) {

    let variants = this.generalFormGroup.get('variants') as FormArray;
    let variantSpecification = variants.controls[i].get('specifications') as FormArray;
    variantSpecification.removeAt(j);
  }

  removeSelectedFile(variantIndex: number, imageIndex: number) {
    let variants = this.generalFormGroup.get('variants') as FormArray;
    let images = variants.controls[variantIndex].get('images') as FormArray;

    images.removeAt(imageIndex);
  }

  removeVariant(i: number) {

    this.variants = this.generalFormGroup.get('variants') as FormArray;
    this.variants.removeAt(i);

  }

  createItem(): import('@angular/forms').AbstractControl {
    return this._formBuilder.group({
      images: this._formBuilder.array([]),
      specifications: this._formBuilder.array([], Validators.required),
      priceVariant: this._formBuilder.control('', Validators.required),
      discountPriceVariant: this._formBuilder.control('', Validators.required),
      quantity: this._formBuilder.control('', Validators.required),
      enableFactoryCheck: this._formBuilder.control(''),
      shouldUseURL: this._formBuilder.control(false),
      couponStartDate: this._formBuilder.control('', Validators.required),
      couponEndDate: this._formBuilder.control('', Validators.required),
      maxselectableRange: this._formBuilder.control(''),
      minselectableRange: this._formBuilder.control(''),
      url: this._formBuilder.control('', Validators.required),
      visible: this._formBuilder.control('')
    }, { validator: [checkCurrentPriceandDiscountPrice('priceVariant', 'discountPriceVariant')] });
  }

  createSpecificationItem(): import('@angular/forms').AbstractControl {
    return this._formBuilder.group({
      titleVariant: this._formBuilder.control('', Validators.required),
      variants_id: this._formBuilder.control('', Validators.required)
    });
  }



  onFileChanged(event: any, i: number) {
    let variant_to_modify = this.variants.controls[i].get('images') as FormArray;
    let that = this;
    if (event.target.files) {

      if (event.target.files.length > 5) {
        this.openMaxLimitDialog();
        return;
      }

      for (let i in event.target.files) {
        let type = event.target.files[i].type;

        if (!type) {
          continue;
        }

        if (type !== "image/jpeg" && type !== 'image/jpg' && type !== 'image/png') {
          this.openWrongFileDialog();
          return;
        }
      }

      let options: NgxPicaResizeOptionsInterface = {
        unsharpAmount: 75,
        aspectRatio: {
          keepAspectRatio: true,
          forceMinDimensions: true
        }
      }


      this._ngxPicaService.resizeImages(event.target.files, 800, 626, options)
        .subscribe((imageResized: File) => {
          let reader: FileReader = new FileReader();

          reader.addEventListener('load', (event: any) => {
            variant_to_modify.push(that._formBuilder.group({ 'base64_image': event.target['result'] }));
          }, false);

          reader.readAsDataURL(imageResized);

        }, (err: NgxPicaErrorInterface) => {
          throw err.err;
        });
    }
  }

  openWrongFileDialog(): void {
    this._dialog.open(WrongFileDialogComponent, {
      width: '300px',
      data: {}
    });
  }

  openMaxLimitDialog(): void {
    this._dialog.open(ImagesInfoDialogComponent, {
      width: '300px',
      data: {}
    });
  }

  pushToArrayDiff($event, i, j) {
    this.selectedVariants[i][j] = [{ "id": $event.source.value, "name": $event.source.triggerValue }];
    let difference = differenceBy(this.anag_variants, this.selectedVariants[i][j], 'id');
    this.selectableVariants[i][j - 1] = difference;
    this.selectableVariants[i][j + 1] = difference;



  }

  setVariantsValues(i, j) {
    let difference = differenceBy(this.anag_variants, this.selectedVariants[i][j - 1], 'id');
    this.selectableVariants[i][j] = difference;
    this.mapDisabledVariants[i][j - 1] = true;
    this.mapDisabledVariants[i][j] = false;
  }

  removeVariantsValues(i, j) {
    delete this.selectedVariants[i][j + 1];

    let difference = differenceBy(this.anag_variants, this.selectedVariants[i][j - 1], 'id');
    this.selectableVariants[i][j] = difference;
  }

  addEvent(event: MatDatepickerInputEvent<Date>, $index: number) {

    let selectedDate: Date = new Date(event.value.valueOf());

    this.generalFormGroup.get('variants').controls[$index].get('minselectableRange').setValue(selectedDate);

    let futureDate: Date = new Date();

    Object.assign(futureDate, selectedDate);

    futureDate.setMonth(futureDate.getMonth() + 3);

    this.generalFormGroup.get('variants').controls[$index].get('maxselectableRange').setValue(futureDate);

  }

  ngOnDestroy(): void {
  }

}
