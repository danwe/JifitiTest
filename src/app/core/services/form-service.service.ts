import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  FormType } from '../types/form';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  getFormF : string = 'http://localhost:3000/form_fields/';

  constructor(  private http: HttpClient,) { }

  getFormFieldType(): Observable<Array<FormType>> {
    return this.http.get<any>(this.getFormF)
  }


}
