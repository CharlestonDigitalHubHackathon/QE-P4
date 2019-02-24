export interface Character {
  country: string;
  age: number;
  gender: string;
  undernourished: boolean;
  literate: boolean;
  educationLevel: number;
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