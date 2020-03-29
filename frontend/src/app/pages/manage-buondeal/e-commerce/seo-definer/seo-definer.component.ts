import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-seo-definer',
  templateUrl: './seo-definer.component.html',
  styleUrls: ['./seo-definer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeoDefinerComponent implements OnInit {

  @Input('formGroup') generalFormGroup;
  smallScreen: boolean;


  constructor(private _breakpointObserver: BreakpointObserver) {
    _breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  ngOnInit() {
  }

}
