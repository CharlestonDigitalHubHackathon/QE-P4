import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  SkyAppConfig
} from '@skyux/config';

import {
  Character,
  Location
} from '../models/';

@Injectable()
export class CharacterService {

  constructor(
    private skyAppConfig: SkyAppConfig,
    private http: HttpClient
  ) {}

  public getCharacter(location: Location): Observable<Character[]> {
    const url = `${this.bff}/characters?location=${location}`;
    return this.http.get<Character[]>(url);
  }

  private get bff(): string {
    return this.skyAppConfig.skyux.appSettings['bff-characters'];
  }
}
