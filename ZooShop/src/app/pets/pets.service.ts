import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { UIService } from '../shared/ui.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class PetsService {
  petTypes$ = new Subject<string[]>();
  ownedPets$ = new Subject<Pet[]>();
  edittedPetData: Pet;
  private currentPets: Pet[] = [];

  constructor(
    private router: Router,
    private db: AngularFirestore,
    private uiService: UIService,
    private profileService: ProfileService,
  ) { }

  addPet(pet: Pet) {
    this.uiService.loadingStateChanged$.next(true);

    let dbResponseNotifications = (snackBarMessage: string) => {
      this.uiService.addingNewPet$.next(false);
      this.uiService.showSnackbar(snackBarMessage, null, 3000);
      this.uiService.loadingStateChanged$.next(false);
    }

    let petData = {};
    petData['name'] = pet.name;
    petData['type'] = pet.type;
    if (pet.owner) {
      petData['owner'] = pet.owner;
    }
    if (pet.passportId) {
      petData['passportId'] = pet.passportId;
    }
    if (pet.passportId) {
      petData['lastVaccinationDate'] = pet.lastVaccinationDate;
    }
    if (pet.description) {
      petData['description'] = pet.description;
    }


    this.db
      .collection("ShopUsers")
      .doc(this.profileService.profile.email)
      .collection('pets')
      .add(petData)
      .then(result => {
        console.log('pet added');
        dbResponseNotifications('pet added');
      })
      .catch(error => {
        console.log('pet wasnt added');
        console.log(error);
        dbResponseNotifications('pet wasnt added');
      });
  }

  editPet(pet: any | Pet) {
    let petData = {};

    if (pet.name) {
      petData['name'] = pet.name;
    }
    if (pet.owner) {
      petData['owner'] = pet.owner;
    }
    if (pet.passportId) {
      petData['passportId'] = pet.passportId;
    }
    if (pet.passportId) {
      petData['lastVaccinationDate'] = pet.lastVaccinationDate;
    }
    if (pet.description) {
      petData['description'] = pet.description;
    }

    this.db
      .collection("ShopUsers")
      .doc(this.profileService.profile.email)
      .collection('pets')
      .doc(this.edittedPetData.id)
      .update(petData)
      .then(result => {
        console.log('successfully updated');
        this.router.navigate(['/pets'])
        this.uiService.showSnackbar('successfully updated', null, 1500);
      })
      .catch(error => {
        console.log('pet wasnt added');
        console.log(error);
        this.uiService.showSnackbar('Error: cound not update', null, 1500);
      });
  }

  removePet(selectedId: string) {
    this.uiService.loadingStateChanged$.next(true);
    this.db
      .doc('ShopUsers/' + this.profileService.profile.email + '/pets/' + selectedId)
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
      .doc(this.profileService.profile.email)
      .collection('pets')
      .snapshotChanges()
      .pipe(
        map(dbPetsArray => {
          return dbPetsArray.map((dbPet) => {
            return {
              id: dbPet.payload.doc.id,
              name: (dbPet.payload.doc.data() as Pet).name,
              type: (dbPet.payload.doc.data() as Pet).type,
              owner: (dbPet.payload.doc.data() as Pet).owner,
              passportId: (dbPet.payload.doc.data() as Pet).passportId,
              lastVaccinationDate: (dbPet.payload.doc.data() as Pet).lastVaccinationDate,
              description: (dbPet.payload.doc.data() as Pet).description,
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

  fetchPetTypes() {
    this.db
      .collection('Animals')
      .snapshotChanges()
      .pipe(
        map(dbPetstypesArray => {
          return dbPetstypesArray.map((dbPetType) => (<any>dbPetType.payload.doc.data()).type);
        }))
      .subscribe((result: string[]) => {
        this.petTypes$.next(result);
      }, error => {
        console.log(`--------------fetchUserData error-------- start`);
        console.log(error);
        console.log(`--------------fetchUserData error-------- end`);
      });
  }

}
