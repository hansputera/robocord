export declare const useState: <T>(defaultValue?: T) => {
    getState: () => T;
    setState: (newState: T) => T;
};
