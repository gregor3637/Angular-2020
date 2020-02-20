import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserRoutingModule } from './user-routing-module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
