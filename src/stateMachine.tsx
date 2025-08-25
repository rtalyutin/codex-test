import React, { createContext, PropsWithChildren, useContext } from 'react';
import { createMachine } from 'xstate';
import { useInterpret, useSelector } from '@xstate/react';
import { GamePhase } from './types';

const gameMachine = createMachine({
  id: 'game',
  initial: 'setup',
  states: {
    setup: { on: { NEXT: 'deal' } },
    deal: { on: { NEXT: 'planning' } },
    planning: { on: { NEXT: 'feeding' } },
    feeding: {
      on: {
        LOOP: { target: 'feeding' },
        NEXT: 'cleanup',
      },
    },
    cleanup: { on: { NEXT: 'scoring' } },
    scoring: { on: { RESET: 'setup' } },
  },
});

const ServiceContext = createContext<ReturnType<typeof useInterpret> | null>(
  null,
);

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const service = useInterpret(gameMachine);
  return (
    <ServiceContext.Provider value={service}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useGamePhase = (): GamePhase => {
  const service = useContext(ServiceContext);
  if (!service) {
    throw new Error('GameProvider missing');
  }
  return useSelector(service, (s) => s.value as GamePhase);
};
