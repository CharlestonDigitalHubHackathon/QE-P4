import { CharacterState } from './character-state';

export class DatabaseCharacter {

  /* tslint:disable:variable-name */
  public HC_ID?: string;
  public HC_Data: string;
  public HC_StudentID: string;
  public HC_Status: string;
  /* tslint:enable:variable-name */

  public static fromCharacter(character: Character, status: CharacterState): DatabaseCharacter {
    return {
      HC_Data: JSON.stringify(character),
      HC_Status: status.toString(),
      HC_StudentID: character.studentId
    };
  }

  public static toCharacter(dbCharacter: DatabaseCharacter): Character {
    console.log('toCharacter: ' + JSON.stringify(dbCharacter));
    let character = JSON.parse(dbCharacter.HC_Data);
    character.HC_ID = dbCharacter.HC_ID;
    character.studentId = dbCharacter.HC_StudentID;
    return character;
  }
}

export interface Character {
  HC_ID?: string;
  step?: number;
  studentId?: string;
  country: string;
  age: number;
  gender: string;
  undernourished: boolean;
  literate: boolean;
  // educationLevel: number;
  baseHealth: number;
  shop: ShopItem[];
  usd: number;
  name: string;
  inventory: InventoryItem[];
  hasBasicMath: boolean;
}

export interface ShopItem {
  name: string;
  description: string;
  cost: number;
  healsHP: number;
}

export interface InventoryItem {
  name: string;
  description: string;
  healsHP: number;
}
