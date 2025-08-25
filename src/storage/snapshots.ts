import { openDB } from 'idb';
import { GameEvent, EventJournal } from '../events';

const DB_NAME = 'codex';
const STORE = 'journal';

const getDb = () =>
  openDB(DB_NAME, 1, { upgrade: (db) => db.createObjectStore(STORE) });

export const saveSnapshot = async (events: GameEvent[]) => {
  const db = await getDb();
  await db.put(STORE, events, 'events');
};

export const loadSnapshot = async (): Promise<GameEvent[]> => {
  const db = await getDb();
  return ((await db.get(STORE, 'events')) as GameEvent[]) || [];
};

export const autoSaveJournal = (journal: EventJournal, interval = 10) => {
  let count = 0;
  return (event: GameEvent) => {
    journal.append(event);
    count += 1;
    if (count >= interval) {
      count = 0;
      saveSnapshot(journal.snapshot());
    }
  };
};
