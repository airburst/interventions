type EventEmitterFunction<T> = (data: T) => void;

export class EventEmitter<T> {
  private events: Record<string, EventEmitterFunction<T>[]>;

  constructor() {
    this.events = {};
  }

  on(event: string, listener: EventEmitterFunction<T>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event: string, data: T) {
    const listeners = this.events[event];

    if (listeners) {
      listeners.forEach((listener) => listener(data));
    }
  }
}
