import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterByIdPipe } from './filter-by-id.pipe';
import { FilterBrandsPipe } from './filter-brands.pipe';
import { BrandSearchPipe } from './brand-search.pipe';
import { EscapeHtmlPipe } from './escape-html-pipe';
import { PrettyPrintPipe } from './pretty-print-json';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FilterByIdPipe,
        FilterBrandsPipe,
        BrandSearchPipe,
        EscapeHtmlPipe,
        PrettyPrintPipe
    ],
    exports: [
        FilterByIdPipe,
        FilterBrandsPipe,
        BrandSearchPipe,
        EscapeHtmlPipe,
        PrettyPrintPipe
    ]
})
export class PipesModule { }
