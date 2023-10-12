import createObservable from ".";

describe('createObservable', () => {
  it('should create an observable with an initial value', () => {
    const observable = createObservable(10);
    expect(observable.get()).toEqual(10);
  });

  it('should notify subscribers when the value changes', () => {
    const observable = createObservable(0);
    let notifiedValue = -1;
    const unsubscribe = observable.subscribe((newValue) => {
      notifiedValue = newValue;
    });

    observable.set(42);
    expect(notifiedValue).toEqual(42);
    unsubscribe(); 

    observable.set(2);
    expect(notifiedValue).toEqual(42); 
  });

  it('should allow multiple subscribers', () => {
    const observable = createObservable(0);
    let notifiedValue1 = -1;
    const unsubscribe1 = observable.subscribe((newValue) => {
      notifiedValue1 = newValue;
    });

    let notifiedValue2 = -1;
    const unsubscribe2 = observable.subscribe((newValue) => {
      notifiedValue2 = newValue;
    });

    observable.set(42);
    expect(notifiedValue1).toEqual(42);
    expect(notifiedValue2).toEqual(42);

    unsubscribe1(); 

    observable.set(2); 
    expect(notifiedValue1).toEqual(42);
    expect(notifiedValue2).toEqual(2);

    unsubscribe2();

    observable.set(10); 
    expect(notifiedValue1).toEqual(42);
    expect(notifiedValue2).toEqual(2);
  });
});
