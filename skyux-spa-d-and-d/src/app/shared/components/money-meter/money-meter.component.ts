import {
  Component, OnInit
} from '@angular/core';
import {
  SkyModalService
} from '@skyux/modals';

import { GameService, WishlistService } from '../../services';

import { WishItem } from '../../models';

import { WishlistComponent } from '../wishlist/wishlist.component';
import { WishItem } from '../../models/wishitem.model';

@Component({
  selector: 'app-money-meter',
  templateUrl: './money-meter.component.html',
  styleUrls: ['./money-meter.component.scss']
})
export class MoneyMeterComponent implements OnInit {
  public money: number;
  public isWishlistOpen = false;
  public wishlist: WishItem[];

  constructor(
    private gameService: GameService,
    private modalService: SkyModalService,
    private wishlistService: WishlistService
  ) {
    // this.gameService.money.next(2);
  }

  public ngOnInit() {
    this.gameService.
      money
      .subscribe((money: number) => {
        this.money = money;
      });

    this.wishlistService
      .getItems()
      .subscribe((wishlist: WishItem[]) => {
        this.wishlist = wishlist;
      });
  }

  public showWishlist() {
    this.isWishlistOpen = !this.isWishlistOpen;
  //  const modal =  this.modalService.open(WishlistComponent);
  //  modal.closed.subscribe(() => {
  //    console.log('closed');
  //  });
  }
}
