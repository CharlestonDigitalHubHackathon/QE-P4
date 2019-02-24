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

    this.gameService.characterState.subscribe((state: CharacterState) => {
      this.characterIsDead = state === CharacterState.Failure;
      this.youWon = state === CharacterState.Success;
    });

    this.gameService.deathText.subscribe((text: string) => {
      this.deathText = text;
    });

  }

  public startGame() {
    console.log('Starting the game');
    this.gameStarted = true;
    this.gameService.gameStep.next(1);
    this.gameService.characterState.next(CharacterState.InGame);
  }

  public tryAgain() {
    console.log('Try again');
    this.gameService.gameStep.next(1);
    this.gameService.characterState.next(CharacterState.NotPlaying);
    this.gameService.dockingClamp.next(true);
    this.gameStarted = false;
  }

}
