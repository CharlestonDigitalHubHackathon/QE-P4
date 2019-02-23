import {
  NgModule
} from '@angular/core';

import {
  HttpClientModule
} from '@angular/common/http';

import {
  AppSkyModule
} from './app-sky.module';

import {
  AgmCoreModule
} from '@agm/core';

import {
  CharacterService,
  StudentService,
  GameService
} from './shared/services';

import {
  SkyWaitService
} from '@skyux/indicators';


@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8oaVIMXyl-txot22B8NjejFxPJWEzAbc'
    })
  ],
  exports: [
    AppSkyModule,
    AgmCoreModule,
    HttpClientModule
  ],
  providers: [
    CharacterService,
    StudentService,
    SkyWaitService,
    GameService
  ],
  entryComponents: []
})
export class AppExtrasModule { }
