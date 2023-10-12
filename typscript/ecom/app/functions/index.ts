function createObservable<T>(initialValue: T) {
  let value = initialValue;
  const listeners: ((value: T) => void)[] = [];

  return {
    subscribe: (listener: (value: T) => void): (() => void) => {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      };
    },
    set: (newValue: T) => {
      value = newValue;
      listeners.forEach((listener) => listener(value));
    },

    get: () => value,
  };
}

const myObservable = createObservable<number>(0);

const unsubscribe = myObservable.subscribe((newValue) => {
  console.log(`Value changed to ${newValue}`);
});

myObservable.set(42);

unsubscribe();

myObservable.set(2);

export default createObservable;
