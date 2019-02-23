import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { Student } from '../../models';
import { StudentService } from '../../services';

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

  constructor (
    private studentService: StudentService
  ) {}

  public startGame() {
    console.log('Starting the game');
    this.gameStarted = true;
  }

  public ngOnInit() {
    this.studentService
      .get(this.sid)
      .subscribe((student: Student) => {
        this.student = student;
        console.log(student);
      });
  }

}
