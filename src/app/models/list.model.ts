export interface ListModel {
    count: number
    next: string 
    previous: null
    results: itemListModel[]

}

export interface itemListModel {
    name: string
    url: string
}

export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number; 
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    };
    types: { slot: number, type: NameUrlPair }[];
    abilities: { slot: number, ability: NameUrlPair }[];
}

export interface ItemListWithSprite extends NameUrlPair {
    spriteUrl: string;
    types: string[];
}

export interface TypeModel {
  name: string;
  url: string;
}

export interface TypeListModel {
  count: number;
  results: TypeModel[];
}

export interface NameUrlPair {
    name: string;
    url: string;
}