import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { AuthFormValue } from '../interfaces/auth-form-value.interface';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(authFormValue: AuthFormValue): Observable<any> {
    return this.http.post(`${environment.api}/auth/login`, authFormValue).pipe(
      tap((response: any) => {
        const user: User = { id: response.id, username: response.username };
        this.setSession(user, response.access_token);
      })
    );
  }

  register(authFormValue: AuthFormValue): Observable<any> {
    return this.http.post(`${environment.api}/auth/register`, authFormValue).pipe(
      tap((response: any) => {
        const user: User = { id: response.id, username: response.username };
        this.setSession(user, response.access_token);
      })
    );
  }

  private setSession(user: User, access_token: string) {
    localStorage.setItem(environment.userInfoStorageKey, JSON.stringify(user));
    localStorage.setItem(environment.jwtStorageKey, access_token)
  }

  logout() {
    localStorage.removeItem(environment.userInfoStorageKey);
    localStorage.removeItem(environment.jwtStorageKey);
    this.router.navigateByUrl('/login');
  }

  private getToken(): string | null {
    return localStorage.getItem(environment.jwtStorageKey)
  }
}
