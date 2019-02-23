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

  public play(student: Student) {
    const url = this.skyAppConfig.runtime.params.getUrl(`/student/details/${student.HS_ID}`);
    this.router.navigateByUrl(url);
  }

  private get bff(): string {
    return this.skyAppConfig.skyux.appSettings['bff-students'];
  }
}
