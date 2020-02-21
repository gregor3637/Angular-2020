import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop/shop.component';
import { SharedModule } from '../shared/shared.module';
import { TableSelectionComponent } from './table-selection/table-selection.component';
import { ShopRoutingModule } from './shop-router.module';
import { ShopHistoryComponent } from './shop-history/shop-history.component';



@NgModule({
  declarations: [
    ShopComponent,
    TableSelectionComponent,
    ShopHistoryComponent,
  ],
  imports: [
    SharedModule,
    ShopRoutingModule,
  ]
})
export class ShopModule { }
