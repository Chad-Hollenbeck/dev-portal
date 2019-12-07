import { Validators, FormGroup, FormControl, FormArray } from '@angular/forms';

export class UserRateVM {
  uid: string; // Document ID
  amount: number; // Item Name
  startDate: string;


  createFormGroup?(): FormGroup {
    return new FormGroup({
      amount: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
    });
  }

  createFormControlGroup?(): FormGroup {
    return new FormGroup({
      rates: new FormArray([])
    });
  }
}
