import { Injectable } from '@angular/core';
import { User } from '../user/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUser(): User | null {
    const user = localStorage.getItem(environment.userInfoStorageKey)
    if (user) {
      return JSON.parse(user)
    }
    return null
  }
}
