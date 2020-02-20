import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ShopItem } from '../shop-item.model';
import { ShopService } from '../shop.service';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

const DUMMY_DATA: ShopItem[] = [
  { id: '1', image: '../../../assets/food-dog.png', name: 'DogFood', price: 10, quantity: 100, position: 1 },
  { id: '2', image: '../../../assets/food-cat.png', name: 'CatFood', price: 20, quantity: 200, position: 2 },
  { id: '3', image: '../../../assets/food-fish.jpg', name: 'Leash', price: 30, quantity: 300, position: 3 },
];


/**
 * @title Table with selection
 */
@Component({
  selector: 'table-selection',
  styleUrls: ['./table-selection.component.scss'],
  templateUrl: './table-selection.component.html',
})
export class TableSelectionComponent implements OnInit, OnDestroy {
  private itemsSubscribtion: Subscription;
  private shopTableData: ShopItem[] = [];

  dataSource = new MatTableDataSource<ShopItem>(this.shopTableData);
  selection = new SelectionModel<ShopItem>(true, []);

  ngOnInit(): void {
    this.itemsSubscribtion = this.shopService.items$.subscribe(shopItems => {
      this.dataSource.data = shopItems;
    });
    this.shopService.fetchShopItems();
  }

  ngOnDestroy(): void {
    if (this.itemsSubscribtion) {
      this.itemsSubscribtion.unsubscribe();
    }
  }

  constructor(
    private elem: ElementRef,
    private shopService: ShopService,
    private uiService: UIService,
  ) { }



  displayedColumns: string[] = [
    'image',
    'name',
    'quantity',
    'price',
    'buyingQuantity',
  ]

  onBuy() {
    let elements = this.elem.nativeElement.querySelectorAll('.table-buying-quantity');
    this.dataSource.data.values;
    let buyingFields = [...elements].filter(x => x.value);
    let purchasedItemRowId = buyingFields.map(el => {
      return {
        id: el.id.replace('zzzzzzzzzzzz-', ''),
        quantity: el.value,
      };
    });
    // let das = elements.
    let tableData = this.dataSource.data.filter(x => {

    });

    let purchesedItems: any[] = [];

    for (const data of purchasedItemRowId) {
      let found = this.dataSource.data.filter(x => x.serverId === data.id);
      let merged = {};
      if (found) {
        merged = { ...found[0], ...data };

        let c = 3;
      }

      let br = 33;
      purchesedItems.push(merged);
    }

    this.shopService.purchesItems(purchesedItems)

    DUMMY_DATA[0].quantity = 77;
    let test = 3;
  }

  obtainId(id: string) {
    return 'zzzzzzzzzzzz-' + id;
  }

  obtainPathToImage(imageName: string) {
    return `../../../assets/${imageName}.png`;
  }

}
