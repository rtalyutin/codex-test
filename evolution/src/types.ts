export type Trait = string

export interface Card {
  id: string
  trait: Trait
}

export interface Species {
  id: string
  traits: Trait[]
  population: number
  food: number
}

export interface Player {
  id: string
  species: Species[]
  hand: Card[]
}

export type Phase =
  | 'setup'
  | 'deal'
  | 'planning'
  | 'feeding'
  | 'cleanup'
  | 'scoring'
  | 'end'

export interface GameState {
  phase: Phase
  players: Player[]
  deck: Card[]
  discard: Card[]
}
