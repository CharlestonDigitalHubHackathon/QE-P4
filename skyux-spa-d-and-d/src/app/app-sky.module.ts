import {
  NgModule
} from '@angular/core';

import {
  SkyAppLinkModule
} from '@skyux/router';

@NgModule({
  imports: [
    SkyAppLinkModule
  ],
  exports: [
    SkyAppLinkModule
  ]
})
export class AppSkyModule { }
