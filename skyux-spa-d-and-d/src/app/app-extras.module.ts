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
  GameService,
  WishlistService
} from './shared/services';

import {
  SkyWaitService
} from '@skyux/indicators';

import {
  WishlistComponent
} from './shared/components/wishlist/wishlist.component';

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
    GameService,
    WishlistService
  ],
  entryComponents: [
    WishlistComponent
  ]
})
export class AppExtrasModule { }
