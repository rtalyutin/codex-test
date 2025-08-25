export type Phase = 'deal' | 'play' | 'grow' | 'feed'

export type GameState = {
  seed: number
  phase: Phase
}

export type DealEvent = { type: 'DEAL'; payload?: unknown }
export type PlayTraitEvent = { type: 'PLAY_TRAIT'; payload?: unknown }
export type GrowEvent = { type: 'GROW'; payload?: unknown }
export type FeedEvent = { type: 'FEED'; payload?: unknown }
export type AttackEvent = { type: 'ATTACK'; payload?: unknown }
export type NextPhaseEvent = { type: 'NEXT_PHASE' }

export type GameEvent =
  | DealEvent
  | PlayTraitEvent
  | GrowEvent
  | FeedEvent
  | AttackEvent
  | NextPhaseEvent

export const initial = (seed: number): GameState => ({
  seed,
  phase: 'deal',
})

export const compactState = (state: GameState) => ({
  seed: state.seed,
  phase: state.phase,
})

type Reducer<E extends GameEvent> = (state: GameState, event: E) => GameState

const ensurePhase = (state: GameState, phase: Phase, action: string) => {
  if (state.phase !== phase) {
    throw new Error(`${action} is not allowed during ${state.phase} phase`)
  }
}

export const DEAL: Reducer<DealEvent> = (state, event) => {
  ensurePhase(state, 'deal', event.type)
  return state
}

export const PLAY_TRAIT: Reducer<PlayTraitEvent> = (state, event) => {
  ensurePhase(state, 'play', event.type)
  return state
}

export const GROW: Reducer<GrowEvent> = (state, event) => {
  ensurePhase(state, 'grow', event.type)
  return state
}

export const FEED: Reducer<FeedEvent> = (state, event) => {
  ensurePhase(state, 'feed', event.type)
  return state
}

export const ATTACK: Reducer<AttackEvent> = (state, event) => {
  ensurePhase(state, 'feed', event.type)
  return state
}

const phases: Phase[] = ['deal', 'play', 'grow', 'feed']

export const NEXT_PHASE: Reducer<NextPhaseEvent> = (state) => {
  const index = phases.indexOf(state.phase)
  const next = phases[(index + 1) % phases.length]
  return { ...state, phase: next }
}

export const reducer = (state: GameState, event: GameEvent): GameState => {
  switch (event.type) {
    case 'DEAL':
      return DEAL(state, event)
    case 'PLAY_TRAIT':
      return PLAY_TRAIT(state, event)
    case 'GROW':
      return GROW(state, event)
    case 'FEED':
      return FEED(state, event)
    case 'ATTACK':
      return ATTACK(state, event)
    case 'NEXT_PHASE':
      return NEXT_PHASE(state, event)
    default:
      throw new Error(`Unknown event type ${(event as GameEvent).type}`)
  }
}
