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
  SkyActionButtonModule,
  SkyCardModule,
  SkyDefinitionListModule
} from '@skyux/layout';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyAlertModule,
    SkyActionButtonModule,
    SkyCardModule,
    SkyDefinitionListModule
  ]
})
export class AppSkyModule { }
