import { NgModule } from '@angular/core';
import { PetComponent } from './pet/pet.component';
import { PetsComponent } from './pets/pets.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { DeletePetComponent } from './delete-pet/delete-pet.component';
import { CreatePetProfileComponent } from './create-pet-profile/create-pet-profile.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule } from '@angular/router';
import { PetsRoutingModule } from './pets-routing.module';



@NgModule({
  declarations: [
    PetComponent,
    PetsComponent,
    DeletePetComponent,
    CreatePetProfileComponent,
    EditComponent,
  ],
  imports: [
    SharedModule,
    MatCardModule,
    RouterModule,
    PetsRoutingModule,
  ],

  entryComponents: [DeletePetComponent]
})
export class PetsModule { }
