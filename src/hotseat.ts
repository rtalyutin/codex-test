import { useState } from 'react';

export const useHotSeat = (playerIds: string[]) => {
  const [index, setIndex] = useState(0);
  const nextPlayer = () => setIndex((i) => (i + 1) % playerIds.length);
  return { activePlayer: playerIds[index], nextPlayer };
};
