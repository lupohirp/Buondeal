import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from "@angular/core";
@Injectable()
export class MatPaginatorInternational extends MatPaginatorIntl {
    itemsPerPageLabel = 'Oggetti in vendita';
    nextPageLabel = 'Prossimi 5';
    previousPageLabel = 'Precedenti 5';

    getRangeLabel = function (page, pageSize, length) {
        if (length === 0 || pageSize === 0) {
            return '0 di ' + length;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return startIndex + 1 + ' - ' + endIndex + ' di ' + length;
    };

}
