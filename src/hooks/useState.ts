export const useState = <T>(defaultValue?: T) => {
    let st = defaultValue;
    return {
        getState: () => st,
        setState: (newState: T) => st = newState,
    }
};