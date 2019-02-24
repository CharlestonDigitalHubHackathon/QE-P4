import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { Student, Character, DatabaseCharacter } from '../../models';
import { StudentService, GameService } from '../../services';
import { CharacterState } from '../../models/character-state';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  @Input()
  public sid: string;

  public student: Student;
  public character: Character;

  constructor (
    private studentService: StudentService,
    private gameService: GameService
  ) {}

  public ngOnInit() {
    this.studentService
      .get(this.sid)
      .subscribe((student: Student) => {
        this.student = student;

        console.log('student str: ' + JSON.stringify(student));

        if (this.gameService.character.value === undefined) {
          let dbCharacter = this.student.Characters.find((c) => {
            return (
              (<any>CharacterState)[c.HC_Status] === CharacterState.NotPlaying
              || (<any>CharacterState)[c.HC_Status] === CharacterState.InGame
            )
            && c.HC_Data !== undefined;
          });
          if (dbCharacter === undefined) {
            console.error('TODO: No active character');
          }
          this.gameService.character.next(DatabaseCharacter.toCharacter(dbCharacter));
        }
      });
    this.gameService.character
      .subscribe((character: Character) => {
        this.character = character;
      });

  }

}
