import { writeToPath } from "@fast-csv/format";
import { parseFile } from "@fast-csv/parse";
import { existsSync } from "fs";
import path from "path";

const rows = [
    {
        a: 'a',
        b: 'b',
        c: 'c'
    }, {
        a: 'aaaaaaaaaaaa',
        b: 'bbbbbbbbbbbb',
        c: 'cccccccccccccccc',
    }
];
const dir = path.resolve(__dirname, 'test.csv');

if (!existsSync(dir)) {
    writeToPath(path.resolve(__dirname, 'test.csv'), rows)
    .on('error', console.error)
    .on('finish', () => console.log('finish'));
} else {
    const rows = [];
    parseFile(dir, {
        headers: ['a', 'b', 'c'],
        trim: true,
        skipRows: 1
    }).on('data', (chk) => rows.push(chk))
    .on('end', () => console.log(rows));
}

console.log('success');