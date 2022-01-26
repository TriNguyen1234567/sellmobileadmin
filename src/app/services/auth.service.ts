import { Injectable } from '@angular/core';
import { User } from '../components/model/user';
import { USERS } from '../constant/common';
import { notEmpty } from '../utils/data.utils';

@Injectable()
export class AuthService {
  constructor() {
  }

  public login = (username: string, password: string): User => {
    const user: User = USERS.find((x) => {
      return x.username === username && x.password === password
    });
    if (notEmpty(user)) {
      delete user.password;
    }
    return user;
  }
}
