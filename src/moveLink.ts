import { GameEvent } from './events';

export const encodeMoves = (events: GameEvent[]): string =>
  btoa(unescape(encodeURIComponent(JSON.stringify(events))));

export const decodeMoves = (hash: string): GameEvent[] => {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(hash))));
  } catch {
    return [];
  }
};
