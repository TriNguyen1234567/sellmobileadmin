import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { notEmpty } from '../utils/data.utils';
import { User } from '../components/model/user';
import { USER_ROLE } from '../constant/common';

@Injectable({
  providedIn: 'root'
})
export class RoleBaseGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userData = localStorage.getItem('user');
    if (notEmpty(userData)) {
      const user: User = JSON.parse(userData);
      if (user.role == USER_ROLE.EMPLOYEE) {
        this.router.navigate(['dashboard']);
        return false;
      }
    }
    return true;
  }
}
