import {
  Component,
  OnInit
} from '@angular/core';

import {
  SkyModalInstance
} from '@skyux/modals';

import {
  WishlistService
} from '../../services';

import {
  WishItem
} from '../../models/wishitem.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  public wishlist: WishItem[];

  constructor(
    private instance: SkyModalInstance,
    private wishlistService: WishlistService
  ) {}

  public ngOnInit() {
    this.wishlistService
      .getItems()
      .subscribe((wishlist: WishItem[]) =>  {
        this.wishlist = wishlist;
      });
  }

  public close() {
    this.instance.close();
  }
}
