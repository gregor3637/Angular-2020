import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, UrlSegment } from '@angular/router'
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';

@Injectable()

export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        if (this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }

    canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
        if (this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }

}