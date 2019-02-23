import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  of
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

  public getLocations(): Observable<Location[]> {
    return of([
      {
        name: 'China',
        latitude: 35.861660,
        longitude: 104.195396
      },
      {
        name: 'Mexico',
        latitude: 23.634501,
        longitude: -102.552788
      },
      {
        name: 'United States',
        latitude: 37.090240,
        longitude: -95.712891
      },
      {
        name: 'Zimbabwe',
        latitude: -19.015438,
        longitude: 29.154858
      }
    ]);
  }

  public getCharacter(location: Location): Observable<Character[]> {
    const url = `${this.bff}?location=${location.name}`;
    return this.http.get<Character[]>(url);
  }

  private get bff(): string {
    return this.skyAppConfig.skyux.appSettings['bff-characters'];
  }
}
