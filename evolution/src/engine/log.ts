import { createHash } from 'node:crypto'

export type GameEvent<TPayload = unknown> = {
  t: number // event index
  type: string
  actor: string
  payload: TPayload
  cs?: string // checksum for log integrity
}

export const CHECKSUM_INTERVAL = 16

export const checksum = (data: string): string =>
  createHash('sha256').update(data).digest('hex')

export const append = <TState, TPayload = unknown>(
  events: GameEvent<TPayload>[],
  event: Omit<GameEvent<TPayload>, 't' | 'cs'>,
  state: TState,
  compactState: (s: TState) => unknown,
  interval = CHECKSUM_INTERVAL,
): GameEvent<TPayload> => {
  const t = events.length
  const e: GameEvent<TPayload> = { ...event, t }
  if ((t + 1) % interval === 0) {
    e.cs = checksum(JSON.stringify(compactState(state)))
  }
  events.push(e)
  return e
}

export const replay = <TState, TPayload = unknown>(
  events: GameEvent<TPayload>[],
  seed: number,
  initial: (seed: number) => TState,
  reducer: (state: TState, event: GameEvent<TPayload>) => TState,
  compactState: (s: TState) => unknown,
  interval = CHECKSUM_INTERVAL,
): TState => {
  return events.reduce((state, event, index) => {
    const next = reducer(state, event)
    if ((index + 1) % interval === 0 && event.cs) {
      const cs = checksum(JSON.stringify(compactState(next)))
      if (cs !== event.cs) {
        throw new Error(`Checksum mismatch at event ${index}`)
      }
    }
    return next
  }, initial(seed))
}
