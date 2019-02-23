import {
  Component,
  // ViewChild,
  OnInit,
  // ElementRef
} from '@angular/core';
import { Character } from '../../models';
import { GameService } from '../../services';

@Component({
  selector: 'app-game-step-stairway',
  templateUrl: './game-step-stairway.component.html',
  styleUrls: ['./game-step-stairway.component.scss']
})
export class GameStepStairwayComponent implements OnInit {

  private character: Character;

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
            icon: 'arrow-circle-o-up',
            name: 'Go up',
            description: this.character.undernourished ? 'You are severely malnourished. In your weakened state, going up the stairs will cost some of your health.' : ''
          },
          {
            id: 2,
            icon: 'arrow-circle-o-down',
            name: 'Go down',
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
        this.gameService.gameStep.next(3);
        this.gameService.money.next(4);
        break;
      case 2:
        this.gameService.isDead.next(true);
        this.gameService.deathText.next('You descend the stairs and enter a room where several more aliens are busy working at control panels and terminals. As you enter, the aliens stop their work and stare at you with looks of surprise. An impressive looking alien sitting in the middle of the room says, "Zoobs, seize the earthling!" Before you can react, two Zoobs grab you and subdue you. You feel a drowsy sensation as you are put to sleep. After the Zoobs are finished with their experiments, they jettison your lifeless body out the airlock.');
    }
  }

}
