import { GameState } from './types';

export interface GameEvent {
  type: string;
  payload?: unknown;
}

export class EventJournal {
  private events: GameEvent[] = [];

  append(event: GameEvent) {
    this.events.push(event);
  }

  snapshot() {
    return [...this.events];
  }

  replay(
    initial: GameState,
    reducers: Record<string, (s: GameState, p: unknown) => void>,
  ) {
    return this.events.reduce((state, event) => {
      const reducer = reducers[event.type];
      if (reducer) {
        reducer(state, event.payload);
      }
      return state;
    }, initial);
  }
}
