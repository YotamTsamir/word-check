export class MyActionListener {
  constructor() {
    this.listeners = new Map();
  }

  private listeners: Map<string, Function[]>;

  registerListener(action: string, listener: (data:any) => void) {
    if (!this.listeners.has(action)) {
      this.listeners.set(action, []);
    }
    this.listeners.get(action)!.push(listener);
  }

  removeListener(action: string) {
    this.listeners.delete(action)
  }

  emit(action: string, data: any) {
    const listeners = this.listeners.get(action)
    if(!listeners){
        throw new Error(`No action ${action} registered`)
    }
    for(const func of listeners){
        func(data)
    }
  }
}
