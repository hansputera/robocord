export class Formatter {
    static exceptionDateFile(date: Date) {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
};
