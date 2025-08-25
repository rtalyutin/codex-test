import type { GameEvent } from './log'

export type GamePhase = 'deal' | 'play' | 'feeding'

export interface GameState {
  seed: number
  phase: GamePhase
  players: string[]
  turn: number
}

export const initial = (seed: number): GameState => ({
  seed,
  phase: 'deal',
  players: [],
  turn: 0,
})

export const compactState = (state: GameState) => ({
  seed: state.seed,
  phase: state.phase,
  players: [...state.players].sort(),
  turn: state.turn,
})

type Reducer<TPayload = unknown> = (
  state: GameState,
  event: GameEvent<TPayload>,
) => GameState

const assertPlayer = (state: GameState, player: string): void => {
  if (!state.players.includes(player)) {
    throw new Error(`Unknown player ${player}`)
  }
}

const assertPhase = (state: GameState, phase: GamePhase): void => {
  if (state.phase !== phase) {
    throw new Error(`Expected phase ${phase} but was ${state.phase}`)
  }
}

export const DEAL: Reducer = (state, event) => {
  assertPhase(state, 'deal')
  assertPlayer(state, event.actor)
  // business logic placeholder
  return state
}

export const PLAY_TRAIT: Reducer = (state, event) => {
  assertPhase(state, 'play')
  assertPlayer(state, event.actor)
  // business logic placeholder
  return state
}

export const GROW: Reducer = (state, event) => {
  assertPhase(state, 'play')
  assertPlayer(state, event.actor)
  // business logic placeholder
  return state
}

export const FEED: Reducer = (state, event) => {
  assertPhase(state, 'feeding')
  assertPlayer(state, event.actor)
  // business logic placeholder
  return state
}

export const ATTACK: Reducer = (state, event) => {
  assertPhase(state, 'feeding')
  assertPlayer(state, event.actor)
  // business logic placeholder
  return state
}

const phaseOrder: GamePhase[] = ['deal', 'play', 'feeding']

export const NEXT_PHASE: Reducer = (state, event) => {
  assertPlayer(state, event.actor)
  const index = phaseOrder.indexOf(state.phase)
  const next = phaseOrder[(index + 1) % phaseOrder.length]
  return { ...state, phase: next }
}

export const reducers = {
  DEAL,
  PLAY_TRAIT,
  GROW,
  FEED,
  ATTACK,
  NEXT_PHASE,
} as const

export const reducer: Reducer = (state, event) => {
  const r = (reducers as Record<string, Reducer>)[event.type]
  if (!r) {
    throw new Error(`Unknown event type ${event.type}`)
  }
  return r(state, event)
}
