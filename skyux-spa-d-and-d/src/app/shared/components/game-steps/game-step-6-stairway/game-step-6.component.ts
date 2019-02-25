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
  selector: 'app-game-step-6',
  templateUrl: './game-step-6.component.html',
  styleUrls: ['./game-step-6.component.scss']
})
export class GameStep6Component implements OnInit {

  private character: Character;

  public choices: any[];

  public WIDTH = 600;

  private stepHealthWarning: string;
  private deathJettison: string;

  constructor(
    private gameService: GameService,
    private waitSvc: SkyWaitService,
    private resourcesSvc: SkyAppResourcesService
  ) {

    this.resourcesSvc.getString('game_choice_alien_health_steps')
      .subscribe((s) => this.stepHealthWarning = s);
    this.resourcesSvc.getString('game_failure_alien_jettison')
      .subscribe((s) => this.deathJettison = s);

  }

  public ngOnInit() {

    this.gameService.character
      .subscribe((char: Character) => {
        this.character = char;

        this.choices = [
          {
            id: 1,
            icon: 'level-up',
            name: 'Go up',
            description: this.character.undernourished ? this.stepHealthWarning : ''
          },
          {
            id: 2,
            icon: 'level-down',
            name: 'Go down',
            description: ''
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
        this.gameService.updateGameStep(3)
          .subscribe(() => {
            this.gameService.addMoney(1);
            this.waitSvc.endBlockingPageWait();
          });
        break;
      case 2:
        this.gameService.updateCharacterState(CharacterState.Failure, this.deathJettison)
          .subscribe(() => {
            this.waitSvc.endBlockingPageWait();
          });
        break;
      default:
        console.log('unknown choice');
    }
  }

}
