import {
  Component,
  OnInit
} from '@angular/core';

import {
  GameService
} from '../../services';

import {
  CharacterState
} from '../../models/character-state';
import { SkyWaitService } from '@skyux/indicators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public gameStarted = false;
  public currentStep: number;
  public characterIsDead: boolean;
  public deathText: string;
  public youWon = false;

  constructor(
    private gameService: GameService,
    private waitSvc: SkyWaitService
  ) { }

  public ngOnInit() {
    this.gameService.gameStep.subscribe((stepNum) => {
      this.currentStep = stepNum;
    });

    this.gameService.characterState.subscribe((state: CharacterState) => {
      this.characterIsDead = state === CharacterState.Failure;
      this.youWon = state === CharacterState.Success;
      this.gameStarted = state === CharacterState.InGame || this.characterIsDead || this.youWon;
    });

    this.gameService.characterStateText.subscribe((text: string) => {
      this.deathText = text;
    });

  }

  public startGame() {
    this.waitSvc.beginBlockingPageWait();
    console.log('Starting the game');
    this.gameService.startGame()
      .subscribe(() => {
        this.waitSvc.endBlockingPageWait();
      });
  }

  public tryAgain() {
    this.waitSvc.beginBlockingPageWait();
    this.gameService.resetGame()
      .subscribe(() => {
        this.waitSvc.endBlockingPageWait();
      });
  }

}
