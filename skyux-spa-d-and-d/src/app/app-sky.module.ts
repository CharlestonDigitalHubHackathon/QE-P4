import {
  NgModule
} from '@angular/core';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyAlertModule
} from '@skyux/indicators';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyAlertModule
  ]
})
export class AppSkyModule { }
