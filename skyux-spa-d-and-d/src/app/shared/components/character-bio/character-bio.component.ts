import { Component, Input, OnInit } from '@angular/core';

import { Character } from '../../models/character.model';
import { SkyAppAssetsService } from '@skyux/assets';
import { SkyAppResourcesService } from '@skyux/i18n';

@Component({
  selector: 'app-character-bio',
  templateUrl: './character-bio.component.html',
  styleUrls: ['./character-bio.component.scss']
})
export class SkyAvatarDemoComponent implements OnInit {

  @Input()
  public character: Character;

  public avatarUrl: string;
  public localizedCountry: string;
  public localizedGender: string;

  constructor(
    private skyAppAssetsService: SkyAppAssetsService,
    private resourcesSvc: SkyAppResourcesService
  ) {

  }

  public ngOnInit() {

    let countryString = 'game_characterbio_country_';

    let pic1: string;
    switch (this.character.country) {
      case 'Zimbabwe':
        pic1 = 'Black';
        countryString += 'zimbabwe';
        break;
      case 'United States':
        // I know not all Americans are white (and also the other countries their respective ethnicities). TODO roll for skin color.
        pic1 = 'Caucasian';
        countryString += 'usa';
        break;
      case 'China':
        pic1 = 'Asian';
        countryString += 'china';
        break;
      case 'Mexico':
        pic1 = 'Hispanic';
        countryString += 'mexico';
        break;
      default:
        throw new Error('dev error unknown location 5: ' + location);
    }
    let pic2 = this.character.gender === 'female' ? 'Female' : 'Male';
    // TODO add hispanic female avatar
    if (!(pic1 === 'Hispanic' && pic2 === 'Female')) {
      this.avatarUrl = this.skyAppAssetsService.getUrl(`avatars/${pic1}${pic2}.png`);
    }

    this.resourcesSvc.getString(countryString)
      .subscribe((s) => this.localizedCountry = s);
    this.resourcesSvc.getString('game_characterbio_gender_' + this.character.gender)
      .subscribe((s) => this.localizedGender = s);

  }

}
