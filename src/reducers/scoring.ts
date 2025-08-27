import { GameState } from '../types';

export const scoreGame = (state: GameState) => {
  state.players.forEach((p) => {
    p.score = p.species.reduce(
      (sum, s) => sum + s.food + s.population + s.traits.length,
      0,
    );
  });
};
