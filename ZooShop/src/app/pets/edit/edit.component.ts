import { Component, OnInit } from '@angular/core';
import { PetsService } from '../pets.service';
import { Pet } from '../pet.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  edittedPet: Pet;
  isLoading = false;

  constructor(
    private petsService: PetsService
  ) { }

  updatePetProfile(form: NgForm) {
    this.petsService.editPet({
      name: form.value.name,
      passportId: form.value.passportId,
      lastVaccinationDate: form.value.lastVaccinationDate,
      description: form.value.description,
    });
  }

  ngOnInit(): void {
    this.edittedPet = this.petsService.edittedPetData;
  }
}
