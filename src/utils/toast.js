import EventManager from '../lib/EventManager';

// é exportado para que a mesma instância seja usada em outros arquivos
export const toastEventManager = new EventManager();

export default function toast({ type, text }) {
  toastEventManager.emit('addtoast', { type, text });
}
