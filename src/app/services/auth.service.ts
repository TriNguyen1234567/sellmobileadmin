import { Injectable } from '@angular/core';
import { User } from '../components/model/user';
import { USERS } from '../constant/common';

@Injectable()
export class AuthService {
  constructor() {
  }

  public login = (username: string, password: string): User => {
    return USERS.find((x) => {
      return x.username === username && x.password === password
    });
  }
}
