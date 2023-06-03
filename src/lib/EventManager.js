export default class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  // cria o listener -> substitui o addEventListener
  on(event, listener) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);

    this.listeners.get(event).push(listener);
  }

  // dispara o evento -> substitui o dispatchEvent
  emit(event, payload) {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event).forEach((listener) => listener(payload));
  }

  // remove o listener -> substitui o removeEventListener
  removeListener(event, listenerToRemove) {
    const listeners = this.listeners.get(event);

    if (!listeners) return;

    const filteredListeners = listeners.filter((listener) => listener !== listenerToRemove);
    this.listeners.set(event, filteredListeners);
  }
}
