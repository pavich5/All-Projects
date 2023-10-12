"use strict";
function createObservable(initialValue) {
    let value = initialValue;
    const listeners = [];
    return {
        subscribe: (listener) => {
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            };
        },
        set: (newValue) => {
            value = newValue;
            listeners.forEach((listener) => listener(value));
        },
        get: () => value,
    };
}
const myObservable = createObservable(0);
const unsubscribe = myObservable.subscribe((newValue) => {
    console.log(`Value changed to ${newValue}`);
});
myObservable.set(42); 
unsubscribe();
