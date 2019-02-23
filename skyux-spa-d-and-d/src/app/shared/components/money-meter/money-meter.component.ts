import {
  Component, OnInit
} from '@angular/core';
import { GameService } from '../../services';

@Component({
  selector: 'app-money-meter',
  templateUrl: './money-meter.component.html',
  styleUrls: ['./money-meter.component.scss']
})
export class MoneyMeterComponent implements OnInit {
  public money: number;

  constructor(
    private gameService: GameService
  ) {
    this.gameService.money.next(2);
  }

  public ngOnInit() {
    this.gameService.
      money
      .subscribe((money: number) => {
        this.money = money;
      });
  }
}
