import { Injectable } from '@angular/core';
import { User } from '../user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: User | null = null;

  setUser(user: User) {
    this.currentUser = user;
  }

  getUser(): User | null {
    return this.currentUser;
  }

  clearUser() {
    this.currentUser = null;
  }
}
