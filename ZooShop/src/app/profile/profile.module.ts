import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent],
  imports: [
    SharedModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule { }
