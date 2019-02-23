declare var google: any;

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
  CharacterService,
  StudentService
} from '../../services';

import {
  Location,
  Student
} from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {

  public error: string;
  public teacherId: string;
  public locations: Location[];
  public selectedLocation: Location;
  public selectedCharacter: any;

  public registrationForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    private router: Router,
    private skyAppConfig: SkyAppConfig,
    private characterService: CharacterService,
    private studentService: StudentService
  ) {}

  public ngOnInit() {
    this.characterService
      .getLocations()
      .subscribe((locations: Location[]) => {
        this.locations = locations;
      });

    this.teacherId = this.skyAppConfig.runtime.params.get('tid');
  }

  public markerClick(location: Location, index: number) {
    this.selectedLocation = location;
    this.characterService
      .getCharacter(location)
      .subscribe((character: any) => {
        this.selectedCharacter = character;
      });
  }

  public onSubmit() {
    const student: Student = {
      name: this.registrationForm.controls.name.value,
      character: JSON.stringify(this.selectedCharacter)
    };

    this.error = '';

    this.studentService
      .add(student)
      .subscribe(
        (studentAdded: Student) => {
          console.log(studentAdded);
          this.router.navigateByUrl('details');
        },
        (err: any) => {
          this.error = err;
        }
      );
  }
}
