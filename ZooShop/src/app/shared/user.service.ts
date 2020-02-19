import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable(
    // { providedIn: 'root' }
)

export class UserService {
    private userEmailDataSubscriber: Subscription;

    private _userEmail;
    private dbPetsPath: string;

    get userEmail() {
        return this._userEmail || 'unknown';
    }

    constructor(private authService: AuthService) { }

    setUserData() {
        this.userEmailDataSubscriber = this.authService
            .userEmailData$
            .subscribe(email => {
                this._userEmail = email;
            });
    }


}