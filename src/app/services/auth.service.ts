import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { AuthFormValue } from '../components/auth-form/auth-form-value.interface';
import { Observable, tap } from 'rxjs';
import { User } from '../user/user.interface';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private userService = inject(UserService);
  private router = inject(Router);

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(authFormValue: AuthFormValue): Observable<any> {
    return this.http.post(`${environment.api}/auth/login`, authFormValue).pipe(
      tap((response: any) => {
        const userInfo: User = { id: response.id, username: response.username };
        this.setSession(response.access_token, userInfo);
      })
    );
  }

  register(authFormValue: AuthFormValue): Observable<any> {
    return this.http.post(`${environment.api}/auth/register`, authFormValue).pipe(
      tap((response: any) => {
        const userInfo: User = { id: response.id, username: response.username };
        this.setSession(response.access_token, userInfo);
      })
    );
  }

  private setSession(token: string, user: User) {
    localStorage.setItem(environment.jwtLocalStorageKey, token);
    this.userService.setUser(user);
  }

  logout() {
    localStorage.removeItem(environment.jwtLocalStorageKey);
    this.userService.clearUser();
    this.router.navigateByUrl('/login');
  }

  private getToken(): string | null {
    return localStorage.getItem(environment.jwtLocalStorageKey);
  }
}
