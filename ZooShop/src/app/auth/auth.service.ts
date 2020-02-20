import { Subject } from 'rxjs/Subject'
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TransitionCheckState } from '@angular/material/checkbox';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  userEmailData$ = new Subject<string>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private uiService: UIService
  ) { }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged$.next(true);
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.authSuccessfully();
        this.userEmailData$.next(result.user.email);
        this.uiService.loadingStateChanged$.next(false);
      })
      .catch(error => {
        this.uiService.loadingStateChanged$.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      })
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged$.next(true);
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.authSuccessfully();
        this.userEmailData$.next(result.user.email);
        this.uiService.loadingStateChanged$.next(false);
      })
      .catch(error => {
        this.uiService.loadingStateChanged$.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      })
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
