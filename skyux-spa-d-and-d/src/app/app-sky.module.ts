import {
  NgModule
} from '@angular/core';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyAlertModule, SkyLabelModule, SkyKeyInfoModule
} from '@skyux/indicators';

import {
  SkyActionButtonModule,
  SkyCardModule,
  SkyDefinitionListModule,
  SkyPageSummaryModule
} from '@skyux/layout';

import {
  SkyModalModule
} from '@skyux/modals';

import {
  SkyAvatarModule
} from '@skyux/avatar';
import { SkyNumericModule } from '@skyux/core';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyAlertModule,
    SkyActionButtonModule,
    SkyCardModule,
    SkyDefinitionListModule,
    SkyModalModule,
    SkyAvatarModule,
    SkyNumericModule,
    SkyLabelModule,
    SkyPageSummaryModule,
    SkyKeyInfoModule
  ]
})
export class AppSkyModule { }
