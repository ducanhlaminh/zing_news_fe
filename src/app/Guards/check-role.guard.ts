import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { UserService } from '../modules/news/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class CheckRoleGuard implements CanActivate {
  user: any;
  constructor(private UserService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return localStorage.getItem('token') &&
      localStorage.getItem('role_id') === '1'
      ? true
      : false;
  }
}
