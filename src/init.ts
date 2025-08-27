import { GameState, Player } from './types';
import { PRNG } from './rng';

export const initGame = (playerCount: number, seed = Date.now()): GameState => {
  const random = new PRNG(seed);
  const players: Player[] = Array.from({ length: playerCount }, (_, i) => ({
    id: `P${i + 1}`,
    hand: [],
    species: [{ id: `S${i + 1}`, traits: [], population: 1, body: 1, food: 0 }],
    discard: [],
    score: 0,
  }));

  const deck = { cards: [], discard: [] };
  const wateringHole = Math.floor(random.next() * 5) + 5;

  return { players, deck, wateringHole, phase: 'setup', activePlayer: 0 };
};
