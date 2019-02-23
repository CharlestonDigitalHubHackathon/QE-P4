import {
  NgModule
} from '@angular/core';

import {
  AppSkyModule
} from './app-sky.module';

import {
  AgmCoreModule
} from '@agm/core';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8oaVIMXyl-txot22B8NjejFxPJWEzAbc'
    })
  ],
  exports: [
    AppSkyModule,
    AgmCoreModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
