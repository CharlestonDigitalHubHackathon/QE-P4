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
  Student
} from '../models/student.model';

@Injectable()
export class StudentService {

  constructor(
    private skyAppConfig: SkyAppConfig,
    private http: HttpClient
  ) {}

  public getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.bff}/students`);
  }

  public get(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.bff}/students/${id}`);
  }

  public add(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.bff}/students`, student);
  }

  private get bff(): string {
    return this.skyAppConfig.skyux.appSettings['bff-students'];
  }
}
