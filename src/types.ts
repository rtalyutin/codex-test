export type Trait =
  | 'carnivore'
  | 'scavenger'
  | 'foraging'
  | 'fat-tissue'
  | string;

export interface Card {
  id: string;
  trait: Trait;
  food?: number;
}

export interface Species {
  id: string;
  traits: Trait[];
  population: number;
  body: number;
  food: number;
}

export interface Player {
  id: string;
  hand: Card[];
  species: Species[];
  discard: Card[];
  score: number;
}

export interface Deck {
  cards: Card[];
  discard: Card[];
}

export type GamePhase =
  | 'setup'
  | 'deal'
  | 'planning'
  | 'feeding'
  | 'cleanup'
  | 'scoring';

export interface GameState {
  players: Player[];
  deck: Deck;
  wateringHole: number;
  phase: GamePhase;
  activePlayer: number;
}
