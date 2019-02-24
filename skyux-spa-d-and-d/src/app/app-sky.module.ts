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

import {
  SkyAvatarModule
} from '@skyux/avatar';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyAlertModule,
    SkyActionButtonModule,
    SkyCardModule,
    SkyDefinitionListModule,
    SkyModalModule,
    SkyAvatarModule
  ]
})
export class AppSkyModule { }
