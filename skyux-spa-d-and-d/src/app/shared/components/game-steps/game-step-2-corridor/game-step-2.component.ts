import {
  Component,
  OnInit
} from '@angular/core';
import { Character } from '../../../models';
import { GameService } from '../../../services';
import { SkyWaitService } from '@skyux/indicators';

@Component({
  selector: 'app-game-step-2',
  templateUrl: './game-step-2.component.html',
  styleUrls: ['./game-step-2.component.scss']
})
export class GameStep2Component implements OnInit {

  public character: Character;

  private SHIFT_NUM = Math.floor(Math.random() * Math.floor(26));

  public choices: any[];

  public WIDTH = 600;

  constructor(
    private gameService: GameService,
    private waitSvc: SkyWaitService
  ) {

  }

  public ngOnInit() {

    this.gameService.character
      .subscribe((char: Character) => {
        this.character = char;

        this.choices = [
          {
            id: 1,
            icon: 'arrow-left',
            name: this.character.literate ? 'Shuttle Bay, Bridge' : this.caesarShift('Shuttle Bay, Bridge', this.SHIFT_NUM),
            description: 'Go Left'
          },
          {
            id: 2,
            icon: 'arrow-right',
            name: this.character.literate ? 'Engineering Bay' : this.caesarShift('Engineering Bay', this.SHIFT_NUM),
            description: 'Go Right'
          }
        ];

      });
  }

  public makeChoice(id: number) {
    this.waitSvc.beginBlockingPageWait();
    const choice = this.choices.find((v) => v.id === id);
    console.log('Choice made: ' + JSON.stringify(choice));
    switch (id) {
      case 1:
        this.gameService.updateGameStep(6)
          .subscribe(() => {
            this.gameService.addMoney(1);
            this.waitSvc.endBlockingPageWait();
          });
        break;
      case 2:
        this.gameService.updateGameStep(7)
          .subscribe(() => {
            this.gameService.addMoney(1);
            this.waitSvc.endBlockingPageWait();
          });
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
