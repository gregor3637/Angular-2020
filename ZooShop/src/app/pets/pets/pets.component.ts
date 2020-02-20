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

  pets: Pet[] = [];
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private petsService: PetsService,
  ) { }

  onEditHandler(selectedPetData) {
    this.petsService.edittedPetData = selectedPetData;
    this.router.navigate(['/pets/edit']);
  }

  onDeleteHandler(selectedPetData) {
    const dialogRef = this.dialog.open(DeletePetComponent, {
      data: {
        name: selectedPetData.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.petsService.removePet(selectedPetData.id);
      }
    });
  }

  onAddNewPetHandler() {
    console.log('onAddNewPetHandler');
    this.router.navigate(['/pets/create']);
  }

  findAndDeletePet(selectedPetData) {
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
