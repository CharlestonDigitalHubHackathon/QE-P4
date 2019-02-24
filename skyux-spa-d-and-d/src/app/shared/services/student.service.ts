import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Router
} from '@angular/router';

import {
  Observable
} from 'rxjs';

import {
  SkyAppConfig
} from '@skyux/config';

import {
  Student
} from '../models/student.model';
import { Character, DatabaseCharacter } from '../models';
import { CharacterState } from '../models/character-state';

@Injectable()
export class StudentService {

  constructor(
    private skyAppConfig: SkyAppConfig,
    private http: HttpClient,
    private router: Router
  ) {}

  public getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.bff}/student`);
  }

  public get(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.bff}/student/${id}`);
  }

  public add(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.bff}/student`, student);
  }

  public addCharacter(status: CharacterState, character: Character): Observable<DatabaseCharacter> {
    return this.http.post<DatabaseCharacter>(
      `${this.bff}/student/${character.studentId}/character`,
      DatabaseCharacter.fromCharacter(character, status));
  }

  public updateCharacter(status: CharacterState, character: Character): Observable<DatabaseCharacter> {
    console.log(`patching ${this.bff}/character/${character.HC_ID}`);
    console.log(DatabaseCharacter.fromCharacter(character, status));
    console.log('Body: ' + JSON.stringify(DatabaseCharacter.fromCharacter(character, status)));
    return this.http.patch<DatabaseCharacter>(
      `${this.bff}/character/${character.HC_ID}`,
      DatabaseCharacter.fromCharacter(character, status));
  }

  public play(student: Student) {
    const url = this.skyAppConfig.runtime.params.getUrl(`/student/details/${student.HS_ID}`);
    this.router.navigateByUrl(url);
  }

  private get bff(): string {
    return this.skyAppConfig.skyux.appSettings['bff-students'];
  }
}
