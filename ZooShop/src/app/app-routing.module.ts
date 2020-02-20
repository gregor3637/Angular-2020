import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WellcomeComponent } from './wellcome/wellcome.component';
import { AuthGuard } from './auth/auth.guard';


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
    // canLoad: [AuthGuard],
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'profile',
    // canLoad: [AuthGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
