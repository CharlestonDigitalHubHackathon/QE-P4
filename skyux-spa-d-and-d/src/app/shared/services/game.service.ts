import {
  Injectable
} from '@angular/core';

import {
 ReplaySubject, BehaviorSubject
} from 'rxjs';
import { Character } from '../models';
import { CharacterState } from '../models/character-state';

@Injectable()
export class GameService {

  public gameStep: ReplaySubject<number> = new ReplaySubject(0);
  public character: BehaviorSubject<Character> = new BehaviorSubject(undefined);
  public characterState: ReplaySubject<CharacterState> = new ReplaySubject(0);
  public deathText: ReplaySubject<string> = new ReplaySubject(0);
  public dockingClamp: ReplaySubject<boolean> = new ReplaySubject(0);

  public money: ReplaySubject<number> = new ReplaySubject(0);
  private currentMoney = 0;
  public addMoney(toAdd: number) {
    this.currentMoney += toAdd;
    this.money.next(this.currentMoney);
  }

}
