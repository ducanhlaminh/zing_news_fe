import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../modules/news/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class CheckRoleGuard implements CanActivate {
  constructor(private UserService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.UserService.inforUser) {
      this.UserService.getDataInforUser;
    }
    if (this.UserService.inforUser?.role_id === 2) {
      return true;
    } else {
      this.router.navigate(['trang-chu']);
      return false;
    }
  }
}
