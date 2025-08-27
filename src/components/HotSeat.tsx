import React from 'react';

export const HotSeatScreen: React.FC<{ onContinue: () => void }> = ({
  onContinue,
}) => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#000',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <button onClick={onContinue}>Next Player</button>
  </div>
);
