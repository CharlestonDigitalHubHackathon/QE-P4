import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import {
  SkyAppConfig
} from '@skyux/config';

import {
  CharacterService,
  StudentService,
  GameService
} from '../../services';

import {
  Location,
  Student,
  DatabaseCharacter
} from '../../models';
import { CharacterState } from '../../models/character-state';
import { SkyWaitService } from '@skyux/indicators';

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
    name: new FormControl('', Validators.required)
  });

  constructor(
    private skyAppConfig: SkyAppConfig,
    private characterService: CharacterService,
    private studentService: StudentService,
    private gameService: GameService,
    private waitSvc: SkyWaitService
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
    this.waitSvc.beginBlockingPageWait();
    this.selectedLocation = location;
    this.characterService
      .getCharacter(location)
      .subscribe((character: any) => {
        this.selectedCharacter = character;
        this.waitSvc.endBlockingPageWait();
      });
  }

  public onSubmit() {
    this.waitSvc.beginBlockingPageWait();
    const student: Student = {
      HS_Name: this.registrationForm.controls.name.value,
      HS_Share_Key: this.skyAppConfig.runtime.params.get('tid')
      // Characters: [
      //   DatabaseCharacter.fromCharacter(this.selectedCharacter, 'Not Started', ??)
      // ]
      // HS_Character_ID: JSON.stringify(this.selectedCharacter)
    };

    this.error = '';

    this.studentService
      .add(student)
      .subscribe(
        (studentAdded: Student) => {

          console.log(JSON.stringify(studentAdded));

          this.selectedCharacter.studentId = studentAdded.HS_ID;
          console.log('adding character ' + JSON.stringify(this.selectedCharacter));

          this.studentService.addCharacter(CharacterState.NotPlaying, this.selectedCharacter)
            .subscribe((dbCharacter: DatabaseCharacter) => {
              this.studentService.play(studentAdded);
              this.gameService.character.next(DatabaseCharacter.toCharacter(dbCharacter));
              this.waitSvc.endBlockingPageWait();
            },
            (err: any) => {
              this.error = err;
              this.waitSvc.endBlockingPageWait();
            });

        },
        (err: any) => {
          this.error = err;
          this.waitSvc.endBlockingPageWait();
        }
      );
  }
}
