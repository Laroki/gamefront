import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActiveGames } from '../interfaces/game.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  getUser(): User | null {
    const user = localStorage.getItem(environment.userInfoStorageKey)
    if (user) {
      return JSON.parse(user)
    }
    return null
  }

  getActiveGames(): Observable<ActiveGames[]> {
    return this.http.get(`${environment.api}/user/active-games`) as Observable<ActiveGames[]>
  }
}
