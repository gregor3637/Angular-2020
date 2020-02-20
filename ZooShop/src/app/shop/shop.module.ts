import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop/shop.component';
import { SharedModule } from '../shared/shared.module';
import { TableSelectionComponent } from './table-selection/table-selection.component';
import { ShopRoutingModule } from './shop-router.module';



@NgModule({
  declarations: [
    ShopComponent,
    TableSelectionComponent
  ],
  imports: [
    SharedModule,
    ShopRoutingModule,
  ]
})
export class ShopModule { }
