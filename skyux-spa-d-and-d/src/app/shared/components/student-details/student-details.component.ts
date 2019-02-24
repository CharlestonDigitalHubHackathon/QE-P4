import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { Student, Character } from '../../models';
import { StudentService, GameService } from '../../services';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  @Input()
  public sid: string;

  public student: Student;

  constructor (
    private studentService: StudentService,
    private gameService: GameService
  ) {}

  public ngOnInit() {
    this.studentService
      .get(this.sid)
      .subscribe((student: Student) => {
        this.student = student;
        console.log(student);
        try {
          this.student.character = <Character>JSON.parse(this.student.HS_Character_ID);
          console.log(JSON.stringify(this.student.character));
          this.gameService.character.next(this.student.character);
        } catch (ex) {
          // TODO do something
        }
      });
  }

}
