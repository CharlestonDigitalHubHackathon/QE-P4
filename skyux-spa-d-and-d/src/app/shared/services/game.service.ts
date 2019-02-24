import {
  Injectable
} from '@angular/core';

import {
  ReplaySubject,
  BehaviorSubject,
  Observable
} from 'rxjs';
import { Character, DatabaseCharacter } from '../models';
import { CharacterState } from '../models/character-state';
import { StudentService } from './student.service';

@Injectable()
export class GameService {

  public gameStep: ReplaySubject<number> = new ReplaySubject(0);
  public character: BehaviorSubject<Character> = new BehaviorSubject(undefined);
  public characterState: BehaviorSubject<CharacterState> = new BehaviorSubject(CharacterState.NotPlaying);
  public characterStateText: ReplaySubject<string> = new ReplaySubject(0);
  public dockingClamp: ReplaySubject<boolean> = new ReplaySubject(0);

  public money: ReplaySubject<number> = new ReplaySubject(0);
  private currentMoney = 0;

  constructor(
    private studentService: StudentService
  ) {

  }

  public addMoney(toAdd: number) {
    this.currentMoney += toAdd;
    this.money.next(this.currentMoney);
  }

  public updateGameStep(step: number): Observable<DatabaseCharacter> {
    return new Observable<DatabaseCharacter>((obs) => {
      let character = this.character.value;
      character.step = step;
      this.studentService.updateCharacter(this.characterState.value, character)
        .subscribe(
          (dbCharacter) => {
            this.character.next(character);
            this.gameStep.next(step);
            obs.next(dbCharacter);
            obs.complete();
          },
          (error) => {
            obs.error(error);
          }
        );
    });
  }

  public updateCharacterState(status: CharacterState, stateText: string): Observable<DatabaseCharacter> {
    return new Observable<DatabaseCharacter>((obs) => {
      this.studentService.updateCharacter(status, this.character.value)
        .subscribe(
          (dbCharacter) => {
            this.characterState.next(status);
            this.characterStateText.next(stateText);
            obs.next(dbCharacter);
            obs.complete();
          },
          (error) => {
            obs.error(error);
          }
        );
      });
  }

  // public updateCharacter(status: CharacterState, character: Character): Observable<DatabaseCharacter> {
  //   return new Observable<DatabaseCharacter>((obs) => {
  //     this.studentService.updateCharacter(status, character)
  //       .subscribe(
  //         (dbCharacter) => {
  //           this.character.next(character);
  //           this.characterState.next(status);
  //           obs.next(dbCharacter);
  //           obs.complete();
  //         },
  //         (error) => {
  //           obs.error(error);
  //         }
  //       );
  //   });
  // }

  public startGame(): Observable<DatabaseCharacter> {
    return new Observable<DatabaseCharacter>((obs) => {
      this.updateCharacterState(CharacterState.InGame, undefined)
        .subscribe(
          (dbCharacter) => {
            this.gameStep.next(1);
            obs.next(dbCharacter);
            obs.complete();
          },
          (error) => {
            obs.error(error);
          }
        );
    });
  }

  public resetGame(): Observable<DatabaseCharacter> {
    return new Observable<DatabaseCharacter>((obs) => {
      this.updateCharacterState(CharacterState.NotPlaying, undefined)
        .subscribe((dbCharacter) => {
          this.gameStep.next(1);
          this.dockingClamp.next(true);
          obs.next(dbCharacter);
          obs.complete();
        });
    });
  }

}
