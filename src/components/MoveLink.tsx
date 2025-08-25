import React from 'react';
import { encodeMoves, decodeMoves } from '../moveLink';
import { GameEvent } from '../events';

interface Props {
  events: GameEvent[];
  onPaste: (events: GameEvent[]) => void;
}

export const MoveLink: React.FC<Props> = ({ events, onPaste }) => {
  const copy = () => {
    const hash = encodeMoves(events);
    navigator.clipboard.writeText(hash);
  };
  const paste = async () => {
    const text = await navigator.clipboard.readText();
    onPaste(decodeMoves(text));
  };
  return (
    <div>
      <button onClick={copy}>Copy Move</button>
      <button onClick={paste}>Paste Move</button>
    </div>
  );
};
