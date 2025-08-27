import React from 'react';
import { HUD } from './components/HUD';
import { WateringHole } from './components/WateringHole';
import { SpeciesBoard } from './components/SpeciesBoard';
import { Hand } from './components/Hand';
import { Discard } from './components/Discard';

export const App: React.FC = () => (
  <div>
    <HUD />
    <WateringHole />
    <SpeciesBoard />
    <Hand />
    <Discard />
  </div>
);
