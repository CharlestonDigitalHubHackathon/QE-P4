import {
  Injectable
} from '@angular/core';

import {
 ReplaySubject
} from 'rxjs';
import { Character } from '../models';

@Injectable()
export class GameService {

  public gameStep: ReplaySubject<number> = new ReplaySubject(0);
  public character: ReplaySubject<Character> = new ReplaySubject(0);
  public isDead: ReplaySubject<boolean> = new ReplaySubject(0);
  public deathText: ReplaySubject<string> = new ReplaySubject(0);
  public money: ReplaySubject<number> = new ReplaySubject(0);

}
