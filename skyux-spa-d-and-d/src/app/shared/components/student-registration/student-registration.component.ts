import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormGroup,
  FormControl
} from '@angular/forms';

import {
  SkyAppConfig
} from '@skyux/config';

import {
  SkyWaitService
} from '@skyux/indicators';

import {
  StudentService
} from '../../services';

import {
  Student
} from '../../models';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {

  public error: string;
  public teacherId: string;
  public lat = 32.7847535;
  public lng = -79.9441087;

  public registrationForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    private skyAppConfig: SkyAppConfig,
    // private skyWaitService: SkyWaitService,
    private studentService: StudentService
  ) {}

  public ngOnInit() {
    this.teacherId = this.skyAppConfig.runtime.params.get('tid');
  }

  public onSubmit() {
    const student: Student = {
      name: this.registrationForm.controls.name.value
    };

    this.error = '';
    // this.skyWaitService.beginBlockingPageWait();

    this.studentService
      .add(student)
      .subscribe(
        (studentAdded: Student) => {
          console.log(studentAdded);
          // this.skyWaitService.endBlockingPageWait();
        },
        (err: any) => {
          this.error = err;
          // this.skyWaitService.endBlockingPageWait();
        }
      );
  }
}
