function createObservable<T>(initialValue: T) {
  // Initialize the value with the provided initialValue
  let value = initialValue;

  // Create an array to store listener functions
  const listeners: ((value: T) => void)[] = [];

  return {
    // The subscribe function allows external code to listen for changes
    subscribe: (listener: (value: T) => void):() => void => {
      // Push the listener function into the array
      listeners.push(listener);

      // Return a function that allows unsubscribing from this listener
      return () => {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          // Remove the listener from the array
          listeners.splice(index, 1);
        }
      };
    },

    // The set function updates the value and notifies all listeners
    set: (newValue: T) => {
      // Update the value with the new value
      value = newValue;

      // Notify all listeners when the state changes
      listeners.forEach((listener) => listener(value));
    },

    // The get function allows external code to retrieve the current value
    get: () => value,
  };
}

// Example usage
const myObservable = createObservable<number>(0);

// Subscribe to changes
const unsubscribe = myObservable.subscribe((newValue) => {
  console.log(`Value changed to ${newValue}`);
});

// Update the value
myObservable.set(42); // This should trigger the listener

// Unsubscribe when no longer needed
unsubscribe();

myObservable.set(2)


export default createObservable