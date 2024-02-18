import { FormServiceService } from './../../../../core/services/form-service.service';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  FormType } from '../../../../core/types/form';
import { UsersService } from '../../../../core/services/users.service';
import { User } from '../../../../core/types/user';
import { phoneNumberValidator } from '../../../validation/phone-number';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements AfterViewInit {
  userEdit: User = {last_name: '', email: '',first_name: '', phone:'', id: ''};

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UpdateUserComponent>, private formBuilder: FormBuilder, private ormServiceService: FormServiceService, private userServicee: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }
  ngAfterViewInit(): void {

  }

  dynamicForm!: FormGroup;
​  listFormType : Array<FormType> = [];

setValueElement(value: string) {
  switch (value) {
    case 'email':
      return this.data.user.email;
      break;
    case 'phone':
      return this.data.user.phone;
      break;
    case 'last_name':
      return this.data.user.last_name;
      break;
      case 'first_name':
    return this.data.user.first_name;
      break;
      default:
      return '';
  }
}

createForm(): FormGroup {
  const formGroup = this.fb.group({});
  this.listFormType.forEach(field => {
    let list = [];
    console.log(field.validators.toString());

    if (field.validators.toString().indexOf('required') > -1) {
      list.push(Validators.required);
    }
    if (field.validators.toString().indexOf('email')> -1) {
      list.push(Validators.email);
    }
    if (field.validators.toString().indexOf('phone')> -1) {
      list.push(phoneNumberValidator());
    }

    const validators = [Validators.required];
    formGroup.addControl(field.key, this.fb.control(this.data != null ? this.setValueElement(field.key) : '' ?? '', list));
  });
  return formGroup;
}


 ngOnInit(): void {

  this.ormServiceService.getFormFieldType().subscribe((data: Array<FormType>) => {
    console.log(data)

    this.listFormType = data;
    this.dynamicForm = this.createForm();
  })
 }

 onSubmit() {
  console.log('Form submitted:', this.dynamicForm);
  if (this.dynamicForm.valid) {
    // Form is valid, handle submission here
    if (this.data == null) {
      this.userServicee.addUser(this.dynamicForm.value).subscribe((data: Array<FormType>) => {
        this.dialogRef.close(true);
      });
    }
    else {
      this.userServicee.editUser(this.dynamicForm.value, this.data.user.id).subscribe((data: Array<FormType>) => {
        this.dialogRef.close(true);
      });
    }

    console.log('Form submitted:', this.dynamicForm.value);
  } else {
    alert(this.dynamicForm.valid)
    // Form is invalid, display error messages or handle accordingly
  }
}
}

