import {
  Component,
  OnInit
} from '@angular/core';
import { Character } from '../../../models';
import { GameService } from '../../../services';

@Component({
  selector: 'app-game-step-5',
  templateUrl: './game-step-5.component.html',
  styleUrls: ['./game-step-5.component.scss']
})
export class GameStep5Component implements OnInit {

  public character: Character;

  public choices: any[];

  public WIDTH = 600;

  public clampEngaged = true;

  constructor(
    private gameService: GameService
  ) {

  }

  public ngOnInit() {

    this.gameService.character
      .subscribe((char: Character) => {
        this.character = char;

        this.choices = [
          {
            id: 1,
            icon: 'circle-o',
            name: 'Press the Glowing Red Button',
            description: ''
          },
          {
            id: 2,
            icon: 'circle-o',
            name: 'Leave the Glowing Button alone',
            description: ''
          }
        ];

      });

    this.gameService.dockingClamp.subscribe((engaged) => {
      this.clampEngaged = engaged;
    });
  }

  public makeChoice(id: number) {
    const choice = this.choices.find((v) => v.id === id);
    console.log('Choice made: ' + JSON.stringify(choice));
    switch (id) {
      case 1:
        this.gameService.dockingClamp.next(false);
        this.gameService.gameStep.next(3);
        this.gameService.addMoney(1);
        break;
      case 2:
        this.gameService.gameStep.next(3);
        this.gameService.addMoney(1);
        break;
      default:
        break;
    }
  }

}
