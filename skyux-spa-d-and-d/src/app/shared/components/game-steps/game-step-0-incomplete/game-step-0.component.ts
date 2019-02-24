import {
  Component
} from '@angular/core';
import { GameService } from '../../../services';
import { SkyWaitService } from '@skyux/indicators';

@Component({
  selector: 'app-game-step-0',
  templateUrl: './game-step-0.component.html',
  styleUrls: ['./game-step-0.component.scss']
})
export class GameStep0Component {

  constructor(
    private gameService: GameService,
    private waitSvc: SkyWaitService
  ) {

  }

  public tryAgain() {
    this.waitSvc.beginBlockingPageWait();
    this.gameService.resetGame()
      .subscribe(() => {
        this.waitSvc.endBlockingPageWait();
      });
  }

}
