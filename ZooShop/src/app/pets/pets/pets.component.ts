import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pet } from '../pet.model';
import { MatDialog } from '@angular/material/dialog';
import { DeletePetComponent } from '../delete-pet/delete-pet.component';
import { Router } from '@angular/router';
import { PetsService } from '../pets.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit, OnDestroy {
  isValid = true;
  private petsSubscription: Subscription;

  data: string[] = ['asd', 'fsd', 'tsas']
  pets: Pet[] = [];
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private petsService: PetsService,
  ) { }

  onEditHandler(selectedPetData) {
    console.log(selectedPetData);
  }

  onDeleteHandler(selectedPetData) {
    console.log(selectedPetData.name);

    const dialogRef = this.dialog.open(DeletePetComponent, {
      data: {
        name: selectedPetData.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.findAndDeletePet(selectedPetData);
      } else {
      }
    });
  }

  onAddNewPetHandler() {
    console.log('onAddNewPetHandler');

    this.router.navigate(['/pets/create']);
  }

  findAndDeletePet(selectedPetData) {
    this.petsService.removePet(selectedPetData.id)
    // let found = this.pets.find(x => x.id === selectedPetData.id);
    // if (found) {
    //   let index = this.pets.indexOf(found);
    //   if (index !== -1) {
    //     this.pets.splice(index, 1);
    //   }
    // }
  }

  ngOnInit(): void {
    this.petsSubscription = this.petsService.ownedPets$.subscribe((pets) => {
      this.pets = pets;
    });
    this.petsService.fetchUserPets();
  }

  ngOnDestroy() {
    if (this.petsSubscription) {
      this.petsSubscription.unsubscribe();
    }
  }
}
