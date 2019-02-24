import {
  Component,
  OnInit
} from '@angular/core';
import { Character } from '../../../models';
import { GameService } from '../../../services';
import { CharacterState } from '../../../models/character-state';

@Component({
  selector: 'app-game-step-6',
  templateUrl: './game-step-6.component.html',
  styleUrls: ['./game-step-6.component.scss']
})
export class GameStep6Component implements OnInit {

  private character: Character;

  public choices: any[];

  public WIDTH = 600;

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
            icon: 'arrow-circle-o-up',
            name: 'Go up',
            /* tslint:disable-next-line:max-line-length */
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
    const choice = this.choices.find((v) => v.id === id);
    console.log('Choice made: ' + JSON.stringify(choice));
    switch (id) {
      case 1:
        this.gameService.gameStep.next(3);
        this.gameService.addMoney(1);
        break;
      case 2:
        this.gameService.characterState.next(CharacterState.Failure);
        /* tslint:disable-next-line:max-line-length */
        this.gameService.updateCharacterState(CharacterState.Failure, 'You descend the stairs and enter a room where several more aliens are busy working at control panels and terminals. As you enter, the aliens stop their work and stare at you with looks of surprise. An impressive looking alien sitting in the middle of the room says, "Zoobs, seize the earthling!" Before you can react, two Zoobs grab you and subdue you. You feel a drowsy sensation as you are put to sleep. After the Zoobs are finished with their experiments, they jettison your lifeless body out the airlock.');
        break;
      default:
        console.log('unknown choice');
    }
  }

}
