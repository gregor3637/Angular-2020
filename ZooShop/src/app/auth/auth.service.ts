import { Subject } from 'rxjs/Subject'
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TransitionCheckState } from '@angular/material/checkbox';
import { UIService } from '../shared/ui.service';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  userEmailData$ = new Subject<string>();
  newUser$ = new Subject<string>();
  private isAuthenticated = false;
  _email: string;

  get email() {
    return this._email || 'unknown';
  }

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private uiService: UIService,
    private profileService: ProfileService,
  ) { }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged$.next(true);
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.profileService.newProfileCreated$.subscribe(successfull => {
          this.uiService.loadingStateChanged$.next(false);
          this.authSuccessfully();
        })
        this.profileService.createNewDB(result.user.email);
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
        this.profileService.profileChanged$.subscribe(data => {
          this.authSuccessfully();
          this._email = result.user.email;
          this.userEmailData$.next(result.user.email);
          this.uiService.loadingStateChanged$.next(false);
        }, errpr => {
          this.uiService.showSnackbar(`${errpr}`, null, 3000);
          this.uiService.loadingStateChanged$.next(false);
        })
        this.profileService.fetchUserData(authData.email);
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
    this.router.navigate(['/profile']);
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
