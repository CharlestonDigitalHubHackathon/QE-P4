import {
  Component, OnInit
} from '@angular/core';

import {
  SkyModalService, SkyModalInstance
} from '@skyux/modals';

import {
  GameService
} from '../../services';

// import {
//   WishItem
// } from '../../models';

import {
  WishlistComponent
} from '../wishlist/wishlist.component';

@Component({
  selector: 'app-money-meter',
  templateUrl: './money-meter.component.html',
  styleUrls: ['./money-meter.component.scss']
})
export class MoneyMeterComponent implements OnInit {
  public money: number;
  private modal: SkyModalInstance;

  constructor(
    private gameService: GameService,
    private modalService: SkyModalService
  ) {
    // this.gameService.money.next(2);
  }

  public ngOnInit() {
    this.gameService.
      money
      .subscribe((money: number) => {
        this.money = money;
      });
  }

  public showWishlist() {
   this.modal = this.modalService.open(WishlistComponent, {
     size: 'large'
   });

   this.modal.closed.subscribe(() => {
     console.log('closed');
   });
  }
}
