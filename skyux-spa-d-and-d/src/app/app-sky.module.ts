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

import {
  SkyModalModule
} from '@skyux/modals';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyAlertModule,
    SkyActionButtonModule,
    SkyCardModule,
    SkyDefinitionListModule,
    SkyModalModule
  ]
})
export class AppSkyModule { }
