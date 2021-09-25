"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useState = void 0;
const useState = (defaultValue) => {
    let st = defaultValue;
    return {
        getState: () => st,
        setState: (newState) => (st = newState),
    };
};
exports.useState = useState;
