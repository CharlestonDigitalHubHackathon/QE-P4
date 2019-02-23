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

  private SHIFT_NUM = Math.floor(Math.random() * Math.floor(26));

  public choices: object[];

  public WIDTH = 400;

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

        if (this.character.items.indexOf('wrench') >= 0) {
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
    var choice = this.choices.find((v) => v.id === id);
    console.log('Choice made: ' + JSON.stringify(choice));
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
