import {
  Injectable
} from '@angular/core';

import {
 ReplaySubject
} from 'rxjs';

@Injectable()
export class GameService {

  public gameStep: ReplaySubject<number> = new ReplaySubject(0);

}
