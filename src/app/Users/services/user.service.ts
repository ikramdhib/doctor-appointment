import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:5000/users/';


  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getTransactionById(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/get/${id}`);
  } 
  
}
