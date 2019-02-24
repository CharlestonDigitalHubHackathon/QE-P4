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

  public currentStep: number;

  constructor(private gameService: GameService) { }

  ngOnInit() {

    this.gameService.gameStep.subscribe((stepNum) => {
      this.currentStep = stepNum;
    });

  }
}
