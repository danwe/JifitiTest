import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  getAllUsersUrl : string = 'http://localhost:3000/users/';
  constructor(  private http: HttpClient,) { }

  getAllUsers(): Observable<Array<User>> {
    return this.http.get<any>(this.getAllUsersUrl)
  }

  addUser(user: User): Observable<any> {
    return this.http.post<any>(this.getAllUsersUrl , user)
  }

  editUser(user: User, id: string): Observable<any> {

    return this.http.put<any>(this.getAllUsersUrl  +  id, user)
  }
}
