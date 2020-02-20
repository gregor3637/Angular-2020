import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Subscription } from 'rxjs';
import { ShopItem } from '../shop-item.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Pet } from 'src/app/pets/pet.model';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 10, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 9, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 7, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 8, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
];

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})


export class ShopComponent {
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}


// export class ShopComponent implements OnInit, AfterViewInit, OnDestroy {
//   ELEMENT_DATA: ShopItem[] = [
//     {
//       id: '1',
//       position: 1,
//       name: 'aaaa',
//       price: 11,
//       quantity: 111,
//       img: '../../../assets/food-cat.png',
//     },
//     {
//       id: '2',
//       position: 2,
//       name: 'bbbb',
//       price: 22,
//       quantity: 222,
//       img: '../../../assets/food-cat.png',
//     },
//     {
//       id: '3',
//       position: 3,
//       name: 'cccc',
//       price: 33,
//       quantity: 333,
//       img: '../../../assets/food-cat.png',
//     },
//     {
//       id: '4',
//       position: 4,
//       name: 'dddd',
//       price: 44,
//       quantity: 444,
//       img: '../../../assets/food-cat.png',
//     }
//   ];


//   private shopItemsSubscription: Subscription;
//   items = new MatTableDataSource<ShopItem>();

//   private exChangedSubscription: Subscription;

//   // displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
//   displayedColumns = ['image', 'name', 'price', 'quantity'];
//   @ViewChild(MatSort) sort: MatSort;
//   @ViewChild(MatPaginator) paginator: MatPaginator;

//   constructor(
//     private shopService: ShopService
//   ) { }

//   ngOnInit(): void {
//     // this.shopItemsSubscription = this.shopService
//     //   .items$
//     //   .subscribe(result => {
//     //     this.items = result;
//     //   })
//     // this.shopService.fetchShopItems();

//     this.items.data = [
//     ]

//   }

//   ngAfterViewInit(): void {
//     this.dataSource.sort = this.sort;
//     this.dataSource.paginator = this.paginator;
//   }

//   ngOnDestroy(): void {
//     if (this.shopItemsSubscription) {
//       this.shopItemsSubscription.unsubscribe();
//     }
//   }










//   dataSource = new MatTableDataSource<ShopItem>(this.ELEMENT_DATA);
//   selection = new SelectionModel<ShopItem>(true, []);

//   /** Whether the number of selected elements matches the total number of rows. */
//   isAllSelected() {
//     const numSelected = this.selection.selected.length;
//     const numRows = this.dataSource.data.length;
//     return numSelected === numRows;
//   }

//   /** Selects all rows if they are not all selected; otherwise clear selection. */
//   masterToggle() {
//     this.isAllSelected() ?
//       this.selection.clear() :
//       this.dataSource.data.forEach(row => this.selection.select(row));
//   }

//   /** The label for the checkbox on the passed row */
//   checkboxLabel(row?: ShopItem): string {
//     if (!row) {
//       return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
//     }
//     return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
//   }
// }
