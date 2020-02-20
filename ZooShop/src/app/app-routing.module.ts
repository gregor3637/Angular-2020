import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WellcomeComponent } from './wellcome/wellcome.component';
import { AuthGuard } from './auth/auth.guard';
import { ShopComponent } from './shop/shop/shop.component';
import { PetsComponent } from './pets/pets/pets.component';
import { CreatePetProfileComponent } from './pets/create-pet-profile/create-pet-profile.component';
import { EditComponent } from './pets/edit/edit.component';


const routes: Routes = [
  { path: '', component: WellcomeComponent },
  // { path: 'training', loadChildren: './training/training-routing.module.ts' }
  {
    path: 'training',
    // canLoad: [AuthGuard],
    loadChildren: () => import('./training/training.module').then(m => m.TrainingModule)
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'pets',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PetsComponent,
      },
      {
        path: 'create',
        component: CreatePetProfileComponent
      },
      {
        path: 'edit',
        component: EditComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
