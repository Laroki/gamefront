import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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
