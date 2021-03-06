import {
  Component,
  OnInit
} from '@angular/core';
import { Character } from '../../../models';
import { GameService } from '../../../services';
import { CharacterState } from '../../../models/character-state';
import { SkyWaitService } from '@skyux/indicators';
import { SkyAppResourcesService } from '@skyux/i18n';

@Component({
  selector: 'app-game-step-4',
  templateUrl: './game-step-4.component.html',
  styleUrls: ['./game-step-4.component.scss']
})
export class GameStep4Component implements OnInit {

  public character: Character;

  public choices: any[];

  public WIDTH = 600;

  public zapped = false;
  public button1Pressed = false;
  public button2Pressed = false;
  public button3Pressed = false;
  public button4Pressed = false;

  private clampEngaged = true;
  private clampDeath: string;

  constructor(
    private gameService: GameService,
    private waitSvc: SkyWaitService,
    private resourcesSvc: SkyAppResourcesService
  ) {

    this.resourcesSvc.getString('game_failure_alien_clamp')
      .subscribe((s) => this.clampDeath = s);

  }

  public ngOnInit() {

    this.gameService.character
      .subscribe((char: Character) => {
        this.character = char;

        this.choices = [
          {
            id: 1,
            icon: 'power-off',
            name: 'Press button ' + (this.character.hasBasicMath ? '1' : '#'),
            description: ''
          },
          {
            id: 2,
            icon: 'power-off',
            name: 'Press button ' + (this.character.hasBasicMath ? '2' : '%'),
            description: ''
          },
          {
            id: 3,
            icon: 'power-off',
            name: 'Press button ' + (this.character.hasBasicMath ? '3' : '$'),
            description: ''
          },
          {
            id: 4,
            icon: 'power-off',
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
    this.zapped = false;
    switch (id) {
      case 1:
        this.button1Pressed = true;
        this.choices[0].iconClass = 'icon-red';
        break;
      case 2:
        if (this.button1Pressed) {
          this.button2Pressed = true;
          this.choices[1].iconClass = 'icon-yellow';
        } else {
          this.zapped = true;
        }
        break;
      case 3:
        if (this.button1Pressed && this.button2Pressed) {
          this.button3Pressed = true;
          this.choices[2].iconClass = 'icon-green';
        } else {
          this.zapped = true;
        }
        break;
      case 4:
        if (this.button1Pressed && this.button2Pressed && this.button3Pressed) {
          this.waitSvc.beginBlockingPageWait();
          if (this.clampEngaged) {
            this.gameService.updateCharacterState(CharacterState.Failure, this.clampDeath)
              .subscribe(() => {
                this.waitSvc.endBlockingPageWait();
              });
          } else {
            this.gameService.updateCharacterState(CharacterState.Success, undefined)
              .subscribe(() => {
                this.waitSvc.endBlockingPageWait();
              });
            this.gameService.addMoney(5);
          }
        } else {
          this.zapped = true;
        }
        break;
      default:
        break;
    }
  }

}
