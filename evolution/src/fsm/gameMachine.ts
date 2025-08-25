import { createMachine, assign } from 'xstate'
import { useMachine } from '@xstate/react'
import {
  append,
  compactState,
  reducer,
  initial as initialState,
  type GameEvent,
  type GameState,
} from '../engine'

interface GameContext {
  state: GameState
  log: GameEvent[]
  players: string[]
  currentPlayer: number
}

type SetupEvent = { type: 'START'; seed: number; players: string[] }
type DealEvent = { type: 'DEAL' }
type PlayTraitEvent = {
  type: 'PLAY_TRAIT'
  actor: string
  payload?: unknown
}
type GrowEvent = { type: 'GROW'; actor: string; payload?: unknown }
type FeedEvent = {
  type: 'FEED'
  actor?: string
  payload?: unknown
}
type NextEvent = { type: 'NEXT' }
type EndFeedingEvent = { type: 'END_FEEDING' }
type CleanupEvent = { type: 'CLEANUP' }
type ScoreEvent = { type: 'SCORE' }

type MachineEvent =
  | SetupEvent
  | DealEvent
  | PlayTraitEvent
  | GrowEvent
  | FeedEvent
  | NextEvent
  | EndFeedingEvent
  | CleanupEvent
  | ScoreEvent

const apply = (ctx: GameContext, event: GameEvent): GameContext => {
  const next = reducer(ctx.state, event)
  append(ctx.log, event, next, compactState)
  return { ...ctx, state: next }
}

export const gameMachine = createMachine({
  id: 'game',
  types: {} as { context: GameContext; events: MachineEvent },
  context: { state: initialState(0), log: [], players: [], currentPlayer: 0 },
  initial: 'setup',
  states: {
    setup: {
      on: {
        START: {
          target: 'deal',
          actions: assign((_, e: SetupEvent) => ({
            state: initialState(e.seed),
            players: e.players,
            log: [],
            currentPlayer: 0,
          })),
        },
      },
    },
    deal: {
      on: {
        DEAL: {
          target: 'planning',
          actions: assign((ctx) =>
            apply(ctx, { type: 'DEAL', actor: 'system' }),
          ),
        },
      },
    },
    planning: {
      on: {
        PLAY_TRAIT: {
          actions: assign((ctx, e: PlayTraitEvent) =>
            apply(ctx, {
              type: 'PLAY_TRAIT',
              actor: e.actor,
              payload: e.payload,
            }),
          ),
        },
        GROW: {
          actions: assign((ctx, e: GrowEvent) =>
            apply(ctx, { type: 'GROW', actor: e.actor, payload: e.payload }),
          ),
        },
        NEXT: 'feeding',
      },
    },
    feeding: {
      on: {
        FEED: {
          actions: assign((ctx, e: FeedEvent) => {
            const actor = e.actor ?? ctx.players[ctx.currentPlayer]
            const nextCtx = apply(ctx, {
              type: 'FEED',
              actor,
              payload: e.payload,
            })
            return {
              ...nextCtx,
              currentPlayer: (ctx.currentPlayer + 1) % ctx.players.length,
            }
          }),
        },
        END_FEEDING: {
          target: 'cleanup',
        },
      },
    },
    cleanup: {
      on: {
        CLEANUP: 'scoring',
      },
    },
    scoring: {
      on: {
        SCORE: 'end',
      },
    },
    end: {
      type: 'final',
    },
  },
})

export const useGameMachine = () => useMachine(gameMachine)
