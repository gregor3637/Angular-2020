import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { UIService } from '../shared/ui.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { UserService } from '../shared/user.service';

@Injectable(
  // { providedIn: 'root' }
)
export class PetsService {
  ownedPets$ = new Subject<Pet[]>();

  private currentPets: Pet[] = [];

  constructor(
    private router: Router,
    private db: AngularFirestore,
    private uiService: UIService,
    private userService: UserService
  ) { }

  addPet(pet: Pet) {
    this.uiService.loadingStateChanged$.next(true);

    let shipPetDataToServer = () => {
      this.uiService.addingNewPet$.next(false);
      this.uiService.showSnackbar('Pet Created', null, 3000);
      this.uiService.loadingStateChanged$.next(false);
    }

    this.db
      .collection("ShopUsers")
      .doc(this.userService.userEmail)
      .collection('pets')
      .add({
        name: pet.name,
        type: pet.type,
        owner: pet.owner || 'unknown',
      })
      .then(result => {
        console.log('pet added');
        shipPetDataToServer();
      })
      .catch(error => {
        console.log('pet wasnt added');
        console.log(error);
        shipPetDataToServer();
      });
  }

  removePet(selectedId: string) {
    this.uiService.loadingStateChanged$.next(true);
    this.db
      .doc('ShopUsers/' + this.userService.userEmail + '/pets/' + selectedId)
      .delete()
      .then((success) => {
        console.log(`successfuly deleted pet`);
        this.uiService.loadingStateChanged$.next(false);
        this.uiService.showSnackbar('Successfuly removed pet', null, 3000);
      }, error => {
        console.log(`didnt find pet to dell it`);
        this.uiService.loadingStateChanged$.next(false);
        this.uiService.showSnackbar('Could not find pet in db, call admin', null, 3000);
      });
  }

  fetchUserPets() {
    this.uiService.loadingStateChanged$.next(true);
    this.db
      .collection('ShopUsers')
      .doc(this.userService.userEmail)
      .collection('pets')
      .snapshotChanges()
      .pipe(
        map(dbPetsArray => {
          return dbPetsArray.map((dbPet) => {
            return {
              id: dbPet.payload.doc.id,
              name: (dbPet.payload.doc.data() as Pet).name,
              type: (dbPet.payload.doc.data() as Pet).type,
            };
          });
        }))
      .subscribe((result: Pet[]) => {
        console.log(`--------------fetchUserData-------- start`);
        console.log(result);
        console.log(`--------------fetchUserData-------- end`);

        this.ownedPets$.next(result);
        this.currentPets = result;
        this.uiService.loadingStateChanged$.next(false);
      }, error => {
        console.log(`--------------fetchUserData error-------- start`);
        console.log(error);
        console.log(`--------------fetchUserData error-------- end`);
        this.uiService.loadingStateChanged$.next(false);
      });
  }

}
