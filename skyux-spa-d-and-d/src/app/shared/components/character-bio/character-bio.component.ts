import { Component, Input } from '@angular/core';

import { Character } from '../../models/character.model';

@Component({
  selector: 'app-character-bio',
  templateUrl: './character-bio.component.html',
  styleUrls: ['./character-bio.component.scss']
})
export class SkyAvatarDemoComponent {

  @Input()
  public character: Character;

  public name = 'Robert C. Hernandez';
  public showImage = true;
  public avatarUrl: string | File = 'https://imgur.com/tBiGElW.png';

  public get src(): string | File {
    return this.showImage ?  this.avatarUrl : undefined;
  }
}