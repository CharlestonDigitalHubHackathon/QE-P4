import {
  Component,
  // ViewChild,
  OnInit,
  // ElementRef
} from '@angular/core';
import { Character } from '../../../models';
import { GameService } from '../../../services';

@Component({
  selector: 'app-game-step-2',
  templateUrl: './game-step-2.component.html',
  styleUrls: ['./game-step-2.component.scss']
})
export class GameStep2Component implements OnInit {

  private character: Character;

  private SHIFT_NUM = Math.floor(Math.random() * Math.floor(26));

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
            icon: 'arrow-circle-o-left',
            name: this.character.literate ? 'Shuttle Bay, Bridge' : this.caesarShift('Shuttle Bay, Bridge', this.SHIFT_NUM),
            description: 'Go Left'
          },
          {
            id: 2,
            icon: 'arrow-circle-o-right',
            name: this.character.literate ? 'Engineering Bay' : this.caesarShift('Engineering Bay', this.SHIFT_NUM),
            description: 'Go Right'
          }
        ];

      });
  }

  public makeChoice(id: number) {
    var choice = this.choices.find((v) => v.id === id);
    console.log('Choice made: ' + JSON.stringify(choice));
    switch (id) {
      case 1:
        this.gameService.gameStep.next(6);
        this.gameService.addMoney(1);
        break;
      case 2:
        // TODO Electrified Corridor
        this.gameService.gameStep.next(0);
        this.gameService.addMoney(1);
        break;
    }
  }

  private caesarShift(str: string, amount: number): string {

    // Wrap the amount
    if (amount < 0)
      return this.caesarShift(str, amount + 26);

    // Make an output variable
    var output = '';

    // Go through each character
    for (var i = 0; i < str.length; i ++) {

      // Get the character we'll be appending
      var c = str[i];

      // If it's a letter...
      if (c.match(/[a-z]/i)) {

        // Get its code
        var code = str.charCodeAt(i);

        // Uppercase letters
        if ((code >= 65) && (code <= 90))
          c = String.fromCharCode(((code - 65 + amount) % 26) + 65);

        // Lowercase letters
        else if ((code >= 97) && (code <= 122))
          c = String.fromCharCode(((code - 97 + amount) % 26) + 97);

      }

      // Append
      output += c;

    }

    // All done!
    return output;

  };
}
