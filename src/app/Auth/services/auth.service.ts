import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:5000/auth';

  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post(`${this.url}/login`, user).pipe(
      tap((response: any) => {
        if (response.accessToken) {
          localStorage.setItem('access_token', response.accessToken);
          this.isLoggedIn = true;
        }
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.url}/register`, user);
  }

  checkAuthStatus(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
    }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isLoggedIn = false;
  }

  isLoggedIn = this.checkAuthStatus();
}
