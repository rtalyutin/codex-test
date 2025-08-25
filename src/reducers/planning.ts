import { GameState, Card } from '../types';

export const playTrait = (
  state: GameState,
  {
    playerId,
    speciesId,
    card,
  }: { playerId: string; speciesId: string; card: Card },
) => {
  const player = state.players.find((p) => p.id === playerId);
  if (!player) return;
  const species = player.species.find((s) => s.id === speciesId);
  if (!species) return;
  species.traits.push(card.trait);
  player.hand = player.hand.filter((c) => c.id !== card.id);
  player.discard.push(card);
};

export const growPopulation = (
  state: GameState,
  { playerId, speciesId }: { playerId: string; speciesId: string },
) => {
  const species = state.players
    .find((p) => p.id === playerId)
    ?.species.find((s) => s.id === speciesId);
  if (species) species.population += 1;
};

export const growBody = (
  state: GameState,
  { playerId, speciesId }: { playerId: string; speciesId: string },
) => {
  const species = state.players
    .find((p) => p.id === playerId)
    ?.species.find((s) => s.id === speciesId);
  if (species) species.body += 1;
};

export const createSpecies = (
  state: GameState,
  { playerId, card }: { playerId: string; card: Card },
) => {
  const player = state.players.find((p) => p.id === playerId);
  if (!player) return;
  player.species.push({
    id: card.id,
    traits: [card.trait],
    population: 1,
    body: 1,
    food: 0,
  });
  player.hand = player.hand.filter((c) => c.id !== card.id);
};
