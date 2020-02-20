import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShopItem } from './shop-item.model';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { UIService } from '../shared/ui.service';
import { map } from 'rxjs/operators';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  items$ = new Subject<ShopItem[]>();
  private items: ShopItem[] = [];

  constructor(
    private router: Router,
    private db: AngularFirestore,
    private uiService: UIService,
    private profileService: ProfileService,
  ) { }

  fetchShopItems() {
    this.uiService.loadingStateChanged$.next(true);
    this.db
      .collection("ShopItems")
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map((doc) => {
            return {
              serverId: doc.payload.doc.id,
              name: (doc.payload.doc.data() as ShopItem).name,
              price: (doc.payload.doc.data() as ShopItem).price,
              quantity: (doc.payload.doc.data() as ShopItem).quantity,
              image: (doc.payload.doc.data() as ShopItem).image,
            };
          });
        }))
      .subscribe((items: any[]) => {
        this.uiService.loadingStateChanged$.next(false);
        this.items = items;
        this.items$.next([...this.items]);
      }, error => {
        this.uiService.loadingStateChanged$.next(false);
        this.uiService.showSnackbar('Fetching shop items failed, try again later', null, 3000)
        this.items$.next([]);
      });
  }

  purchesItems(items: any[]) {
    let dbResponseNotifications = (snackBarMessage: string) => {
      this.uiService.showSnackbar(snackBarMessage, null, 3000);
      this.uiService.loadingStateChanged$.next(false);
    }

    let data = JSON.parse(JSON.stringify(items));

    let d = {};
    for (let i = 0; i < items.length; i++) {
      d[i] = items[i];
    }

    this.db
      .collection('ShopUsers')
      .doc(this.profileService.profile.email)
      .collection('purchesedItems')
      .add(d)
      .then(result => {
        dbResponseNotifications('successfull purchase');
      })
      .catch(error => {
        dbResponseNotifications('Fail to  purchase');
      });
  }
}
