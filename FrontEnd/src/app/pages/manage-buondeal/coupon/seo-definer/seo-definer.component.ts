import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-seo-definer-deals',
  templateUrl: './seo-definer.component.html',
  styleUrls: ['./seo-definer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeoDealsDefinerComponent implements OnInit {

  @Input('formGroup') generalFormGroup;

  constructor() { }

  ngOnInit() {
  }

}
