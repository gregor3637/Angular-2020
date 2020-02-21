import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ShopItem } from '../shop-item.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ShopService } from '../shop.service';
import { Subscription } from 'rxjs';

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
    'date',
    'price',
    'quantity'
  ];
  dataSource = new MatTableDataSource<ShopItem>();
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
      .subscribe((shopHistoryData: any[]) => {
        this.dataSource.data = this.displayHistoryInTable(shopHistoryData);
      });
    this.shopService.fetchPurchasedHistory();
  }

  displayHistoryInTable(dbShopPurchesHistory: any[]) {
    let allItemsInHistory: ShopItem[] = [];

    dbShopPurchesHistory.map(singleOrder => {
      let convertedDate = new Date(singleOrder.date.seconds * 1000);
      let orderItems: ShopItem[] = [];

      for (const key in singleOrder) {
        if (singleOrder.hasOwnProperty(key)) {
          if (key != 'date') {
            const purchaseInfo = singleOrder[key];
            purchaseInfo['date'] = convertedDate;
            purchaseInfo['quantity'] = +purchaseInfo['quantity'];
            orderItems.push(purchaseInfo as ShopItem);
          }
        }
      }

      allItemsInHistory = allItemsInHistory.concat(orderItems);
    })

    return allItemsInHistory;
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
