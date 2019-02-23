import {
  Component, OnInit
} from '@angular/core';

import { StudentService } from '../../services';

import  { Student } from '../../models';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {
  public students: Student[];

  constructor(
    public studentService: StudentService
  ) {}

  public ngOnInit() {
    this.studentService
      .getAll()
      .subscribe((students: Student[]) => {

        // :-(
        students.forEach((student: Student) => {
          student.HS_Character_Data = JSON.parse(student.HS_Character_ID);
        });

        this.students = students;
      });
  }

  public play(student: Student) {
    this.studentService.play(student);
  }
}
