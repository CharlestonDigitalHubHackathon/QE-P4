import {
  Component,
  // ViewChild,
  OnInit,
  // ElementRef
} from '@angular/core';
import { Character } from '../../models';
import { GameService } from '../../services';

@Component({
  selector: 'app-game-step-5',
  templateUrl: './game-step-5.component.html',
  styleUrls: ['./game-step-5.component.scss']
})
export class GameStep5Component implements OnInit {

  private character: Character;

  private SHIFT_NUM = Math.floor(Math.random() * Math.floor(26));

  public choices: any[];

  public WIDTH = 600;

  public clampEngaged = false;

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
    var choice = this.choices.find((v) => v.id === id);
    console.log('Choice made: ' + JSON.stringify(choice));
    switch (id) {
      case 1:
        this.gameService.dockingClamp.next(true);
        this.gameService.gameStep.next(3);
        break;
      case 2:
        this.gameService.gameStep.next(3);
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
