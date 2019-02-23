import { NgModule } from '@angular/core';

// Specify entry components, module-level providers, etc. here.
import {
  AppSkyModule
} from './app-sky.module';

@NgModule({
  exports: [
    AppSkyModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
