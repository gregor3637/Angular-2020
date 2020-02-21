import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { UIService } from '../shared/ui.service';
import { Profile } from './profile.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ProfileService {

  profileChanged$ = new Subject<Profile>();
  newProfileCreated$ = new Subject<boolean>();
  profile: Profile;

  constructor(
    private router: Router,
    private db: AngularFirestore,
    private uiService: UIService,
  ) { }

  createNewDB(email: string, gui: string) {
    let freshProfile: Profile = {
      dbID: gui,
      name: 'n/a',
      age: 0,
      lastLogin: new Date(),
      description: 'n.a',
      email: email,
      image: 'unknown.png',
    }

    this.db
      .collection("ShopUsers")
      .doc(gui)
      .set(freshProfile)
      .then(result => {
        this.profile = freshProfile;
        localStorage.setItem('email', JSON.stringify(this.profile.email))
        this.newProfileCreated$.next(true);
      })
      .catch(error => {
        this.newProfileCreated$.next(false);
      });
  }

  fetchUserData(gui: string) {

    this.db
      .collection('ShopUsers')
      .doc(gui)
      .valueChanges()
      .subscribe((newProfileData) => {
        this.profile = newProfileData as unknown as Profile;
        this.profileChanged$.next(this.profile);
        localStorage.setItem('email', JSON.stringify(this.profile.email));

        console.log('hope this works start');
        console.log(this.profile);
        console.log('hope this works end ');
      });
  }

  edit(data: { name?: string, description?: string, age?: number }) {
    let updatedProfileData = {};

    if (data.name) {
      updatedProfileData['name'] = data.name;
    }
    if (data.description) {
      updatedProfileData['description'] = data.description;
    }
    if (data.age) {
      updatedProfileData['age'] = data.age;
    }

    this.db
      .collection("ShopUsers")
      .doc(this.profile.dbID)
      .update(updatedProfileData)
      .then(result => {
        let upToDateProfile = { ...this.profile, ...updatedProfileData };
        this.profile = upToDateProfile;
        this.profileChanged$.next(this.profile);
        this.uiService.showSnackbar('successfully updated', null, 3000);
        this.router.navigate(['/profile'])
      })
      .catch(error => {
        this.uiService.showSnackbar(`Error: cound not update, ${error}`, null, 3000);
      });
  }
}
