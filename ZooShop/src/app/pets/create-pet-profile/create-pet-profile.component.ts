import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PetsService } from '../pets.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { ProfileService } from 'src/app/profile/profile.service';

@Component({
  selector: 'app-create-pet-profile',
  templateUrl: './create-pet-profile.component.html',
  styleUrls: ['./create-pet-profile.component.scss']
})
export class CreatePetProfileComponent implements OnInit, OnDestroy {
  private loadingSubscription: Subscription;
  private petTypesSubscription: Subscription;
  petTypes: string[] = [];
  isLoading = false;

  constructor(
    private petService: PetsService,
    private uiService: UIService,
    private profileService: ProfileService,
  ) { }

  onCreatePetProfile(form: NgForm) {
    this.petService.addPet({
      //TODO get Real ID from db
      id: '0',
      owner: this.profileService.profile.email,
      name: form.value.name,
      type: form.value.type,
      passportId: form.value.passportId,
      lastVaccinationDate: form.value.lastVaccinationDate,
      description: form.value.description,
    });
  }

  getPetTypes() {
    this.petTypesSubscription = this.petService
      .petTypes$
      .subscribe(types => {
        this.petTypes = types
      });
    this.petService.fetchPetTypes();
  }

  ngOnInit(): void {
    this.loadingSubscription = this.uiService
      .loadingStateChanged$
      .subscribe(isLoading => {
        this.isLoading = isLoading
      });

    this.getPetTypes();
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
    if (this.petTypesSubscription) {
      this.petTypesSubscription.unsubscribe();
    }
  }

}
