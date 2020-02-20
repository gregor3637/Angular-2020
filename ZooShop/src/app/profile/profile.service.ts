import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { UIService } from '../shared/ui.service';
import { Profile } from './profile.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ProfileService {

  profileChanged$ = new Subject<Profile>();
  profile: Profile;

  constructor(
    private router: Router,
    private authService: AuthService,
    private db: AngularFirestore,
    private uiService: UIService,
  ) { }

  fetchUserData() {
    this.db
      .collection('ShopUsers')
      .doc(this.authService.email)
      .valueChanges()
      .subscribe((newProfileData) => {
        this.profile = newProfileData as unknown as Profile;
        this.profileChanged$.next(this.profile);
      });
  }

  edit(data: { name?: string, description?: string, age?: number }) {
    let newData = {};

    if (data.name) {
      newData['name'] = data.name;
    }
    if (data.description) {
      newData['description'] = data.description;
    }
    if (data.age) {
      newData['age'] = data.age;
    }

    this.db
      .collection("ShopUsers")
      .doc(this.authService.email)
      .update(newData)
      .then(result => {
        this.router.navigate(['/profile'])
        this.uiService.showSnackbar('successfully updated', null, 3000);
      })
      .catch(error => {
        this.uiService.showSnackbar('Error: cound not update', null, 3000);
      });
  }
}
