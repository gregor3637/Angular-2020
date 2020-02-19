import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet.model';
import { MatDialog } from '@angular/material/dialog';
import { DeletePetComponent } from '../delete-pet/delete-pet.component';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {
  isValid = true;

  data: string[] = ['asd', 'fsd', 'tsas']
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
    private dialog: MatDialog,
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

  findAndDeletePet(selectedPetData) {
    let found = this.pets.find(x => x.id === selectedPetData.id);
    if (found) {
      let index = this.pets.indexOf(found);
      if (index !== -1) {
        this.pets.splice(index, 1);
      }
    }
  }

  ngOnInit(): void {
  }

}
