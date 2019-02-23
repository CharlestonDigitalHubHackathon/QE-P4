import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { Student } from '../../models';
import { StudentService, GameService } from '../../services';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  public gameStarted = false;

  @Input()
  public sid: string;

  public student: Student;

  public characterIsDead: boolean;

  public currentStep: number;

  public deathText: string;

  public youWon = false;

  constructor (
    private studentService: StudentService,
    private gameService: GameService
  ) {}

  public startGame() {
    console.log('Starting the game');
    this.gameStarted = true;
    this.gameService.gameStep.next(1);
  }

  public tryAgain() {
    console.log('Try again');
    this.gameService.isDead.next(false);
    this.gameService.gameStep.next(1);
    this.gameService.wonTheGame.next(false);
    this.gameService.dockingClamp.next(true);
    this.gameStarted = false;
  }

  public ngOnInit() {
    this.studentService
      .get(this.sid)
      .subscribe((student: Student) => {
        this.student = student;
        console.log(student);
        this.gameService.character.next({
          name: 'Bobby',
          literate: false,
          items: [
            'wrench'
          ],
          undernourished: true,
          hasBasicMath: false
        });
      });

    this.gameService.isDead.subscribe((dead: boolean) => {
      this.characterIsDead = dead;
    });

    this.gameService.deathText.subscribe((text: string) => {
      this.deathText = text;
    });

    this.gameService.gameStep.subscribe((stepNum) => {
      this.currentStep = stepNum;
    });

    this.gameService.wonTheGame.subscribe((won) => {
      console.log('You WON!');
      this.youWon = won;
    });
  }

}
