import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PetsService } from '../pets.service';
import { Pet } from '../pet.model';

@Component({
  selector: 'app-create-pet-profile',
  templateUrl: './create-pet-profile.component.html',
  styleUrls: ['./create-pet-profile.component.scss']
})
export class CreatePetProfileComponent implements OnInit {
  petTypes: string[] = [
    'cat',
    'dog',
    'fish',
  ];
  isLoading = false;
  constructor(
    private petService: PetsService
  ) { }


  onRegisterPet(form: NgForm) {
    this.petService.addPet({
      id: '0',
      name: form.value.name,
      type: form.value.type,
      passportId: form.value.passportId,
      lastVaccinationDate: form.value.lastVaccinationDate,
      description: form.value.description,
    });
    // this.authService.registerUser();
    // this.trainingService.startExercise(f.value.exercise);
  }

  fetchPetTypes() {

  }

  ngOnInit(): void {
  }

}
