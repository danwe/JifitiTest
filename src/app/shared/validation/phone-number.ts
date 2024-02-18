import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const validPhoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;

    if (control.value && !validPhoneNumberPattern.test(control.value)) {
      return { 'invalidPhoneNumber': true };
    }
    
    return null;
  };
}