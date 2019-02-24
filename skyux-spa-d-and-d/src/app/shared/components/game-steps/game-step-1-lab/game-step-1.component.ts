import {
  Component,
  OnInit
} from '@angular/core';
import { Character } from '../../../models';
import { GameService } from '../../../services';
import { CharacterState } from '../../../models/character-state';

@Component({
  selector: 'app-game-step-1',
  templateUrl: './game-step-1.component.html',
  styleUrls: ['./game-step-1.component.scss']
})
export class GameStep1Component implements OnInit {

  public character: Character;

  private SHIFT_NUM = Math.floor(Math.random() * Math.floor(26));

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
            icon: 'arrow-circle-o-left',
            name: this.character.literate ? 'Exit' : this.caesarShift('Exit', this.SHIFT_NUM),
            description: 'Door 1'
          },
          {
            id: 2,
            icon: 'arrow-circle-o-right',
            name: this.character.literate ? 'De-atomizer' : this.caesarShift('De-atomizer', this.SHIFT_NUM),
            description: 'Door 2'
          }
        ];

        if (this.character.inventory.findIndex(i => i.name === 'wrench') >= 0) {
          this.choices.push({
            id: 3,
            icon: 'wrench',
            name: 'Throw wrench at the alien',
            description: ''
          });
        }

      });
  }

  public makeChoice(id: number) {
    const choice = this.choices.find((v) => v.id === id);
    console.log('Choice made: ' + JSON.stringify(choice));
    switch (id) {
      case 1:
        this.gameService.gameStep.next(2);
        // Shortcut for presentations
        // this.gameService.gameStep.next(6);
        this.gameService.addMoney(1);
        break;
      case 2:
        this.gameService.characterState.next(CharacterState.Failure);
        /* tslint:disable-next-line:max-line-length */
        this.gameService.deathText.next('you open the door and find yourself in a small chamber. The door closes behind you and a voice from a speaker says, "De-Atomizer Engaged." You feel a slight pinching sensation as all all the atoms of your body disintegrate. ');
        break;
      case 3:
        this.gameService.characterState.next(CharacterState.Failure);
        /* tslint:disable-next-line:max-line-length */
        this.gameService.deathText.next('The wrench strikes the alien in the back of its "head." It emits a gutteral howl and turns to face you. It pulls a strange contraption from its belt and aims it at you. You feel a tickling sensation as your body is flooded with electric current. The alien then jettisons your lifeless body out the airlock.');
        break;
      default:
        break;
    }
  }

  private caesarShift(str: string, amount: number): string {

    // Wrap the amount
    if (amount < 0) {
      return this.caesarShift(str, amount + 26);
    }

    // Make an output variable
    let output = '';

    // Go through each character
    for (let i = 0; i < str.length; i ++) {

      // Get the character we'll be appending
      let c = str[i];

      // If it's a letter...
      if (c.match(/[a-z]/i)) {

        // Get its code
        let code = str.charCodeAt(i);

        // Uppercase letters
        if ((code >= 65) && (code <= 90)) {
          c = String.fromCharCode(((code - 65 + amount) % 26) + 65);

        // Lowercase letters
        } else if ((code >= 97) && (code <= 122)) {
          c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }

      }

      // Append
      output += c;

    }

    // All done!
    return output;

  }
}
