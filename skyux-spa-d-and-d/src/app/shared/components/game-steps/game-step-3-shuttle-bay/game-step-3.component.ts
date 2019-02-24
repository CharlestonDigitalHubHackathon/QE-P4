import {
  Component,
  OnInit
} from '@angular/core';
import { Character } from '../../../models';
import { GameService } from '../../../services';
import { SkyWaitService } from '@skyux/indicators';

@Component({
  selector: 'app-game-step-3',
  templateUrl: './game-step-3.component.html',
  styleUrls: ['./game-step-3.component.scss']
})
export class GameStep3Component implements OnInit {

  public character: Character;

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
            icon: 'space-shuttle',
            name: 'Get in Shuttle',
            description: ''
          },
          {
            id: 2,
            icon: 'circle-o',
            name: 'Inspect glowing red button ',
            description: ''
          },
          // {
          //   id: 3,
          //   icon: 'arrow-circle-o-right',
          //   name: 'Enter elevator',
          //   description: ''
          // },
          {
            id: 4,
            icon: 'arrow-circle-o-right',
            name: 'Go down stairs',
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
        this.gameService.updateGameStep(4)
          .subscribe(() => {
            this.gameService.addMoney(1);
            this.waitSvc.endBlockingPageWait();
          });
        break;
      case 2:
        this.gameService.updateGameStep(5)
          .subscribe(() => {
            this.gameService.addMoney(1);
            this.waitSvc.endBlockingPageWait();
          });
        break;
      case 3:
        // TODO Elevator (at Shuttle bay)
        this.gameService.updateGameStep(0)
          .subscribe(() => {
            this.gameService.addMoney(1);
            this.waitSvc.endBlockingPageWait();
          });
        break;
      case 4:
      this.gameService.updateGameStep(6)
        .subscribe(() => {
          this.gameService.addMoney(1);
          this.waitSvc.endBlockingPageWait();
        });
        break;
      default:
        break;
    }
  }

}
