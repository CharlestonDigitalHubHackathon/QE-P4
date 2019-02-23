import {
  NgModule
} from '@angular/core';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyAlertModule
} from '@skyux/indicators';

import {
  SkyActionButtonModule
} from '@skyux/layout';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyAlertModule,
    SkyActionButtonModule
  ]
})
export class AppSkyModule { }
