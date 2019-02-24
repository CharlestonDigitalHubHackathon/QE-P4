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
      HS_Name: this.registrationForm.controls.name.value,
      HS_Share_Key: this.skyAppConfig.runtime.params.get('tid'),
      HS_Character_ID: JSON.stringify(this.selectedCharacter),
      character: this.selectedCharacter
    };

    this.error = '';

    this.studentService
      .add(student)
      .subscribe(
        (studentAdded: Student) => {
          this.studentService.play(studentAdded);
        },
        (err: any) => {
          this.error = err;
        }
      );
  }
}
