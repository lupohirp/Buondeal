import { FormGroup, FormControl } from '@angular/forms';


export function emailValidator(control: FormControl): { [key: string]: any } {
    const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}

export function nameSurnameValidator(control: FormControl): { [key: string]: any } {
    const emailRegexp = /\b[A-Z]+.+[?^ ][A-Z].{1,19}|\b[A-Z]+.+[?^,][A-Z].{1,19}/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invaildNameSurname: true };
    }
}

export function fiscalCodeValidator(control: FormControl): { [key: string]: any } {
    const emailRegexp = /^(?:(?:[B-DF-HJ-NP-TV-Z]|[AEIOU])[AEIOU][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[1256LMRS][\dLMNP-V])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidFiscalCode: true };
    }
}


export function numberOnlyValidator(control: FormControl): { [key: string]: any } {
    const emailRegexp = /^[1-9]\d*$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidNumber: true };
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        const password = group.controls[passwordKey];
        const passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true });
        }
    };
}

export function matchingActualPasswords(currentPassword: string, currentUserPassword: string) {
    return (group: FormGroup) => {
        const password = group.controls[currentPassword];
        if (password.value !== currentUserPassword) {
            return password.setErrors({ mismatchedPasswords: true });
        }
    };
}

export function matchingActualAndNewPasswords(currentPassword: string, passwordKey: string) {
    return (group: FormGroup) => {
        const password = group.controls[passwordKey];
        const currentPasswordGroup = group.controls[currentPassword];
        if (password.value === currentPasswordGroup.value) {
            return password.setErrors({ noNewPassword: true });
        }
    };
}

export function checkCurrentPriceandDiscountPrice(currentPrice: string, discountPrice: string) {
    return (group: FormGroup) => {
        const discount_price = group.controls[discountPrice];
        const current_price = group.controls[currentPrice];
        if (Number(discount_price.value) >= Number(current_price.value)) {
            return discount_price.setErrors({ wrongPrice: true });
        } else {
            return discount_price.updateValueAndValidity({ onlySelf: true })
        }
    };
}

