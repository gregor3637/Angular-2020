import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { UIService } from '../shared/ui.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  ownedPets$ = new Subject<Pet[]>();

  pets: Pet[] = [
    {
      id: '3123',
      name: 'kudjo',
      type: 'dog',
      lastVaccinationDate: new Date(2018, 11, 24),
      passportId: '12333',
      description: 'happydog'
    },
    {
      id: '333',
      name: 'garfield',
      type: 'cat',
    },
    {
      id: '3333',
      name: 'Top-Cat',
      type: 'cat',
    },
    {
      id: '3333',
      name: 'Top-Cat',
      type: 'cat',
    },
    {
      id: '3333',
      name: 'Top-Cat',
      type: 'cat',
    },
    {
      id: '3333',
      name: 'Top-Cat',
      type: 'cat',
    },
    {
      id: '3333',
      name: 'Top-Cat',
      type: 'cat',
    }
  ];

  constructor(
    private uiService: UIService,
    private router: Router,
    private db: AngularFirestore,
  ) { }

  addPet(pet: Pet) {
    this.uiService.loadingStateChanged$.next(true);
    // this.db.collection('finishedExercises').add({
    //   id: 'test',
    //   name: 'test',
    //   duration: 555,
    //   calories: 555,
    // });
    // this.db
    //   .collection('Animals')
    //   .add({
    //     type: 'bird'
    //   });
    console.log(`adding a pet`);

    console.log(pet.name);
    console.log(pet.type);

    this.db
      .collection('CustomersPet')
      .add({
        name: pet.name,
        type: pet.type
      });
    // this.db
    //   .collection('ShopUsers')
    //   .doc('evertrading62@gmail.com')
    //   .collection('pets')
    //   .add({
    //     type: pet.type,
    //     name: pet.name,
    //   });
    // this.db
    //   .collection('Animals')
    //   .add(pet)
    //   .then(result => {
    //     console.log(result);
    //     // this.authSuccessfully();
    //     this.uiService.addingNewPet$.next(false);
    //     this.uiService.showSnackbar('Pet Created', null, 3000);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.uiService.addingNewPet$.next(false);
    //     this.uiService.showSnackbar(error.message, null, 3000);
    //   })
  }

  removePet() {

  }

  fetchUserPets() {
    // return ;
    setTimeout(() => {
      this.ownedPets$.next(this.pets);
    }, 1000 * 2);

    // this.db
    //   .collection('Animals')
    //   .valueChanges()
    //   .subscribe((pets: Pet[]) => {
    //     this.ownedPets$.next(pets);
    //   });

    this.fetchUserData();
  }

  fetchUserData() {
    this.uiService.loadingStateChanged$.next(true);
    this.db
      .collection('ShopUsers')
      .doc('evertrading62@gmail.com')
      .collection('pets')
      .snapshotChanges()
      .pipe(
        map(dbPetsArray => {
          return dbPetsArray.map((dbPet) => {
            return {
              id: dbPet.payload.doc.id,
              name: (dbPet.payload.doc.data() as Pet).name,
              duration: (dbPet.payload.doc.data() as Pet).type,
            };
          });
        }))
      .subscribe((result) => {
        console.log(`--------------fetchUserData-------- start`);
        console.log(result);
        console.log(`--------------fetchUserData-------- end`);
        this.uiService.loadingStateChanged$.next(false);
      }, error => {
        console.log(`--------------fetchUserData error-------- start`);
        console.log(error);
        console.log(`--------------fetchUserData error-------- end`);
        this.uiService.loadingStateChanged$.next(false);
      });
    // .snapshotChanges()
    // .pipe(

  }

  private authSuccessfully() {
    this.ownedPets$.next(null);
    this.router.navigate(['/training']);
  }
}
