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
          ]
        });
      });

    this.gameService.isDead.subscribe((dead: boolean) => {
      this.characterIsDead = dead;
    });

    this.gameService.gameStep.subscribe((stepNum) => {
      this.currentStep = stepNum;
    });
  }

}
