import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ShopItem } from '../shop-item.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ShopService } from '../shop.service';
import { Subscription } from 'rxjs';


const DUMMY_DATA: ShopItem[] = [
  {
    id: 'someData',
    image: `food-dog`,
    name: 'petFood',
    price: 10,
    quantity: 100,
    position: 1,
  },
  {
    id: 'someData',
    image: `food-cat`,
    name: 'catFood',
    price: 10,
    quantity: 2200,
    position: 22,
  },
  {
    id: 'someData',
    image: `food-fish`,
    name: 'someData',
    price: 10,
    quantity: 333300,
    position: 3333,
  },
];

@Component({
  selector: 'app-shop-history',
  templateUrl: './shop-history.component.html',
  styleUrls: ['./shop-history.component.scss']
})
export class ShopHistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  private purchasedHistorySubscription: Subscription;


  displayedColumns = [
    'image',
    'name',
    'price',
    'quantity'
  ];
  dataSource = new MatTableDataSource<ShopItem>(DUMMY_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private shopService: ShopService
  ) { }


  obtainPathToImage(imageName: string) {
    return `../../../assets/${imageName}.png`;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.purchasedHistorySubscription = this.shopService
      .purchasedHistoryChanged$
      .subscribe((items: ShopItem[]) => {
        this.dataSource.data = items;
      });
    this.shopService.fetchPurchasedHistory();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy() {
    if (this.purchasedHistorySubscription) {
      this.purchasedHistorySubscription.unsubscribe();
    }
  }
}
