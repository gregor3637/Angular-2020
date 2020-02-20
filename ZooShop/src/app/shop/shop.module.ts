import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop/shop.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { SharedModule } from '../shared/shared.module';
import { TableSelectionComponent } from './table-selection/table-selection.component';



@NgModule({
  declarations: [
    ShopComponent,
    ShopItemComponent,
    TableSelectionComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class ShopModule { }
