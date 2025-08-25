import { GameEvent } from './events';

const ICE_SERVERS = [{ urls: 'stun:stun.l.google.com:19302' }];

export const createConnection = () => {
  const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
  const channel = pc.createDataChannel('events');
  const send = (event: GameEvent) => channel.send(JSON.stringify(event));
  const onEvent = (fn: (event: GameEvent) => void) => {
    channel.onmessage = (e) => fn(JSON.parse(e.data));
  };
  return { pc, channel, send, onEvent };
};

export const createOffer = async (pc: RTCPeerConnection) => {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  return offer;
};

export const acceptAnswer = async (
  pc: RTCPeerConnection,
  answer: RTCSessionDescriptionInit,
) => {
  await pc.setRemoteDescription(answer);
};

export const handleOffer = async (
  pc: RTCPeerConnection,
  offer: RTCSessionDescriptionInit,
) => {
  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  return answer;
};
