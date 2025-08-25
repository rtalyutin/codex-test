import { GameState } from '../types';

export const feedHerbivore = (
  state: GameState,
  { playerId, speciesId }: { playerId: string; speciesId: string },
) => {
  const player = state.players.find((p) => p.id === playerId);
  const species = player?.species.find((s) => s.id === speciesId);
  if (!player || !species) return;
  if (state.wateringHole <= 0 || species.food >= species.population) return;
  state.wateringHole -= 1;
  species.food += 1;
};

export const feedCarnivore = (
  state: GameState,
  {
    playerId,
    speciesId,
    targetPlayerId,
    targetSpeciesId,
  }: {
    playerId: string;
    speciesId: string;
    targetPlayerId: string;
    targetSpeciesId: string;
  },
) => {
  const attacker = state.players
    .find((p) => p.id === playerId)
    ?.species.find((s) => s.id === speciesId);
  const defenderPlayer = state.players.find((p) => p.id === targetPlayerId);
  const defender = defenderPlayer?.species.find(
    (s) => s.id === targetSpeciesId,
  );
  if (!attacker || !defender || attacker.body <= defender.body) return;
  defender.population -= 1;
  attacker.food += 1;
  if (defender.population <= 0 && defenderPlayer) {
    defenderPlayer.species = defenderPlayer.species.filter(
      (s) => s.id !== defender.id,
    );
  }
};
