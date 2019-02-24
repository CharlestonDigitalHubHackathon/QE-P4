import { Component, Input, OnInit } from '@angular/core';

import { Character } from '../../models/character.model';
import { SkyAppAssetsService } from '@skyux/assets';

@Component({
  selector: 'app-character-bio',
  templateUrl: './character-bio.component.html',
  styleUrls: ['./character-bio.component.scss']
})
export class SkyAvatarDemoComponent implements OnInit {

  @Input()
  public character: Character;

  public avatarUrl: string;

  constructor(
    private skyAppAssetsService: SkyAppAssetsService
  ) { }

  ngOnInit() {
    let ethnicity: string;
    switch (this.character.country) {
      case 'Zimbabwe':
        ethnicity = 'Black';
        break;
      case 'United States':
        // I know not all Americans are white (and also the other countries their respective ethnicities). TODO roll for skin color.
        ethnicity = 'Caucasian';
        break;
      case 'China':
        ethnicity = 'Asian';
        break;
      case 'Mexico':
        ethnicity = 'Hispanic';
        break;
      default:
        throw new Error('dev error unknown location 5: ' + location);
    }
    let gender = this.character.gender === 'female' ? 'Female' : 'Male';
    this.avatarUrl = this.skyAppAssetsService.getUrl(`avatars/${ethnicity}${gender}.png`);
  }

}