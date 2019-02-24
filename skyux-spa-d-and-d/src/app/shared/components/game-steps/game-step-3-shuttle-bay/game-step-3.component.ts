import {
  Component,
  // ViewChild,
  OnInit,
  // ElementRef
} from '@angular/core';
import { Character } from '../../../models';
import { GameService } from '../../../services';

@Component({
  selector: 'app-game-step-3',
  templateUrl: './game-step-3.component.html',
  styleUrls: ['./game-step-3.component.scss']
})
export class GameStep3Component implements OnInit {

  public character: Character;

  public choices: any[];

  public WIDTH = 600;

  constructor(
    private gameService: GameService
  ) {

  }

  ngOnInit() {

    this.gameService.character
      .subscribe((char: Character) => {
        this.character = char;

        this.choices = [
          {
            id: 1,
            icon: 'space-shuttle',
            name: 'Get in Shuttle',
            description: ''
          },
          {
            id: 2,
            icon: 'circle-o',
            name: 'Inspect glowing red button ',
            description: ''
          },
          // {
          //   id: 3,
          //   icon: 'arrow-circle-o-right',
          //   name: 'Enter elevator',
          //   description: ''
          // },
          {
            id: 4,
            icon: 'arrow-circle-o-right',
            name: 'Go down stairs',
            description: ''
          }
        ];
      });
  }

  public makeChoice(id: number) {
    var choice = this.choices.find((v) => v.id === id);
    console.log('Choice made: ' + JSON.stringify(choice));
    switch (id) {
      case 1:
        this.gameService.gameStep.next(4);
        this.gameService.money.next(5);
        break;
      case 2:
        this.gameService.gameStep.next(5);
        this.gameService.money.next(4);
        break;
      case 3:
        // Elevator (at Shuttle bay)
        break;
      case 4:
        this.gameService.gameStep.next(6);
        this.gameService.money.next(4);
        break;
    }
  }

}
