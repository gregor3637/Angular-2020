import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { ShopComponent } from './shop/shop.component';



@NgModule({
  declarations: [ItemComponent, ShopComponent],
  imports: [
    CommonModule
  ]
})
export class ShopModule { }
