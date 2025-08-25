import React from 'react';
import { useGamePhase } from '../stateMachine';

export const HUD: React.FC = () => {
  const phase = useGamePhase();
  return <div>HUD - phase: {phase}</div>;
};
