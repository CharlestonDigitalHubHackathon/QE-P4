import {
  Injectable
} from '@angular/core';

import {
 ReplaySubject,
 BehaviorSubject
} from 'rxjs';
import { Character } from '../models';
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

  public updateCharacterState(status: CharacterState, stateText: string) {
    this.studentService.updateCharacter(status, this.character.value)
      .subscribe((dbCharacter) => {
        this.characterState.next(status);
        this.characterStateText.next(stateText);
      });
  }

  public updateCharacter(status: CharacterState, character: Character) {
    this.studentService.updateCharacter(status, character)
      .subscribe((dbCharacter) => {
        this.character.next(character);
        this.characterState.next(status);
      });
  }

  public resetGame() {
    // TODO
    throw new Error('resetGame');
  }

}
