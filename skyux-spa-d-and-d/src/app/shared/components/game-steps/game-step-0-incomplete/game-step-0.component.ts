import {
  Component
} from '@angular/core';
import { GameService } from '../../../services';
import { CharacterState } from '../../../models/character-state';

@Component({
  selector: 'app-game-step-0',
  templateUrl: './game-step-0.component.html',
  styleUrls: ['./game-step-0.component.scss']
})
export class GameStep0Component {

  constructor(
    private gameService: GameService
  ) {

  }

  public tryAgain() {
    console.log('Try again');
    this.gameService.gameStep.next(1);
    this.gameService.updateCharacterState(CharacterState.NotPlaying, undefined);
    this.gameService.dockingClamp.next(true);
  }

}
