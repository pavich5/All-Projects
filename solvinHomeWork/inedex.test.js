"use strict";
import createObservable from './index.js'
test('createObservable should notify subscribers when value changes', () => {
    const observable = createObservable(0);
    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();
    observable.subscribe(subscriber1);
    observable.subscribe(subscriber2);
    observable.set(1);
    expect(subscriber1).toHaveBeenCalledWith(1);
    expect(subscriber2).toHaveBeenCalledWith(1);
});
