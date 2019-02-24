import {
  Component,
  OnInit
} from '@angular/core';
import { Character } from '../../../models';
import { GameService } from '../../../services';
import { CharacterState } from '../../../models/character-state';

@Component({
  selector: 'app-game-step-4',
  templateUrl: './game-step-4.component.html',
  styleUrls: ['./game-step-4.component.scss']
})
export class GameStep4Component implements OnInit {

  private character: Character;

  public choices: any[];

  public WIDTH = 600;

  public button1Pressed = false;
  public button2Pressed = false;
  public button3Pressed = false;
  public button4Pressed = false;

  private clampEngaged = true;

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
            name: 'Press button ' + (this.character.hasBasicMath ? '1' : '#'),
            description: ''
          },
          {
            id: 2,
            icon: 'circle-o',
            name: 'Press button ' + (this.character.hasBasicMath ? '2' : '%'),
            description: ''
          },
          {
            id: 3,
            icon: 'circle-o',
            name: 'Press button ' + (this.character.hasBasicMath ? '3' : '$'),
            description: ''
          },
          {
            id: 4,
            icon: 'circle-o',
            name: 'Press button ' + (this.character.hasBasicMath ? '4' : '&'),
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
        this.button1Pressed = true;
        break;
      case 2:
        this.button2Pressed = true;
        break;
      case 3:
        this.button3Pressed = true;
        break;
      case 4:
        if (this.button1Pressed && this.button2Pressed && this.button3Pressed) {
          if (this.clampEngaged) {
            this.gameService.characterState.next(CharacterState.Failure);
            /* tslint:disable-next-line:max-line-length */
            this.gameService.deathText.next('The space shuttle springs to life, but lurches suddenly. You hear a loud metallic ripping and look back to see the back half of the shuttle, now torn from the rest of the ship, just before the shuttle explodes. You feel a warming sensation as your body is engulfed by the flames');
          } else {
            this.gameService.characterState.next(CharacterState.Success);
            this.gameService.addMoney(5);
          }
        } else {
          this.button4Pressed = true;
        }
        break;
      default:
        break;
    }
  }

}
