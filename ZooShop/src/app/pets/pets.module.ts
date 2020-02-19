import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetComponent } from './pet/pet.component';
import { PetsComponent } from './pets/pets.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { DeletePetComponent } from './delete-pet/delete-pet.component';
import { CreatePetProfileComponent } from './create-pet-profile/create-pet-profile.component';



@NgModule({
  declarations: [
    PetComponent,
    PetsComponent,
    DeletePetComponent,
    CreatePetProfileComponent,
  ],
  imports: [
    SharedModule,
    MatCardModule,
  ],

  entryComponents: [DeletePetComponent]
})
export class PetsModule { }
