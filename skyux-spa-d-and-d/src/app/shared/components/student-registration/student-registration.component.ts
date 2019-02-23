import {
  Component,
  OnInit
} from '@angular/core';

import {
  SkyAppConfig
} from '@skyux/config';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {

  public teacherId: string;
  public lat = 32.7847535;
  public lng = -79.9441087;

  constructor(
    private skyAppConfig: SkyAppConfig
  ) {}

  public ngOnInit() {
    this.teacherId = this.skyAppConfig.runtime.params.get('tid');
  }

  public onSubmit() {
    console.log('submitting...');
  }
}
