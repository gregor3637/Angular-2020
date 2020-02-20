import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WellcomeComponent } from './wellcome/wellcome.component';
import { AuthGuard } from './auth/auth.guard';
import { ShopComponent } from './shop/shop/shop.component';
import { PetsComponent } from './pets/pets/pets.component';
import { CreatePetProfileComponent } from './pets/create-pet-profile/create-pet-profile.component';
import { EditComponent } from './pets/edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: WellcomeComponent
  },
  {
    path: 'training',
    // canLoad: [AuthGuard],
    loadChildren: () => import('./training/training.module').then(m => m.TrainingModule)
  },
  {
    path: 'pets',
    // canLoad: [AuthGuard],
    loadChildren: () => import('./pets/pets.module').then(m => m.PetsModule)
  },
  {
    path: 'shop',
    component: ShopComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
