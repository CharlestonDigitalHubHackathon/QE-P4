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
  selector: 'app-game-step-7',
  templateUrl: './game-step-7.component.html',
  styleUrls: ['./game-step-7.component.scss']
})
export class GameStep7Component implements OnInit {

  public character: Character;

  private SHIFT_NUM = Math.floor(Math.random() * Math.floor(26));

  public choices: any[];

  public WIDTH = 600;
  private deatomizerDeath: string;
  private wrenchDeath: string;

  constructor(
    private gameService: GameService,
    private waitSvc: SkyWaitService,
    private resourcesSvc: SkyAppResourcesService
  ) {

    this.resourcesSvc.getString('game_failure_alien_deatomizer')
      .subscribe((s) => this.deatomizerDeath = s);
    this.resourcesSvc.getString('game_failure_alien_wrench')
      .subscribe((s) => this.wrenchDeath = s);

  }

  public ngOnInit() {

    this.gameService.character
      .subscribe((char: Character) => {
        this.character = char;

        this.choices = [
          {
            id: 1,
            icon: '',
            name: 'Disable',
            description: 'TODO'
          },
          {
            id: 2,
            icon: '',
            name: 'Walk through',
            description: 'TODO'
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
        this.gameService.updateGameStep(8)
          .subscribe(() => {
            this.gameService.addMoney(1);
            this.waitSvc.endBlockingPageWait();
          });
        break;
      case 2:
        // TODO take damage and see if it's enough to kill the character
        this.gameService.updateCharacterState(CharacterState.Failure, 'The electric currents have fried you.')
          .subscribe(() => {
            this.waitSvc.endBlockingPageWait();
          });
        break;
      default:
        break;
    }
  }

}
