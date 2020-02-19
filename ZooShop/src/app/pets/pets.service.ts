import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { UIService } from '../shared/ui.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

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
    this.uiService.addingNewPet$.next(true);
    this.db
      .collection('Animals')
      .add(pet)
      .then(result => {
        console.log(result);
        this.authSuccessfully();
        this.uiService.addingNewPet$.next(false);
      })
      .catch(error => {
        this.uiService.addingNewPet$.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      })
  }

  removePet() {

  }

  fetchUserPets() {
    // return ;
    setTimeout(() => {
      this.ownedPets$.next(this.pets);
    }, 1000 * 5);

    // this.db
    //   .collection('Animals')
    //   .valueChanges()
    //   .subscribe((pets: Pet[]) => {
    //     this.ownedPets$.next(pets);
    //   });
  }


  private authSuccessfully() {
    this.ownedPets$.next(null);
    this.router.navigate(['/training']);
  }
}
