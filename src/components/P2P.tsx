import React, { useRef, useState } from 'react';
import {
  createConnection,
  createOffer,
  acceptAnswer,
  handleOffer,
} from '../p2p';

export const P2P: React.FC = () => {
  const connection = useRef(createConnection()).current;
  const [offer, setOffer] = useState('');
  const [answer, setAnswer] = useState('');

  const makeOffer = async () => {
    const o = await createOffer(connection.pc);
    setOffer(JSON.stringify(o));
  };

  const respond = async () => {
    const a = await handleOffer(connection.pc, JSON.parse(offer));
    setAnswer(JSON.stringify(a));
  };

  const insertAnswer = async () => {
    await acceptAnswer(connection.pc, JSON.parse(answer));
  };

  return (
    <div>
      <button onClick={makeOffer}>Create offer</button>
      <button onClick={respond}>Respond to offer</button>
      <button onClick={insertAnswer}>Insert answer</button>
      <textarea
        placeholder="Offer"
        value={offer}
        onChange={(e) => setOffer(e.target.value)}
      />
      <textarea
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
    </div>
  );
};
