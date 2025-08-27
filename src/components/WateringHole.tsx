import React from 'react';
import { useGamePhase } from '../stateMachine';

export const WateringHole: React.FC = () => {
  const phase = useGamePhase();
  return <div>Watering Hole (phase: {phase})</div>;
};
