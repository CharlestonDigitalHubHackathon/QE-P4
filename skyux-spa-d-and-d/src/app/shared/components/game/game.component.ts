import {
  Component, OnInit,
} from '@angular/core';
import { GameService } from '../../services';

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

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.gameStep.subscribe((stepNum) => {
      this.currentStep = stepNum;
    });

    this.gameService.isDead.subscribe((dead: boolean) => {
      this.characterIsDead = dead;
    });

    this.gameService.deathText.subscribe((text: string) => {
      this.deathText = text;
    });

    this.gameService.wonTheGame.subscribe((won) => {
      console.log('You WON!');
      this.youWon = won;
    });
  }

  public startGame() {
    console.log('Starting the game');
    this.gameStarted = true;
    this.gameService.gameStep.next(1);
  }

  public tryAgain() {
    console.log('Try again');
    this.gameService.isDead.next(false);
    this.gameService.gameStep.next(1);
    this.gameService.wonTheGame.next(false);
    this.gameService.dockingClamp.next(true);
    this.gameStarted = false;
  }

}
