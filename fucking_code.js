/**
 * Testing
 */

const fs = require('fs');
const path = require('path');
const JSFuck = require('jsfuck').JSFuck;

/**
 * 
 * @param {String} fl - File name
 */
const filterJSOnly = (fl) => fl.endsWith('.js');

const fuckingCode = (dir) => {
    fs.readdir(dir, (err, files) => {
        if (err) console.error(err);
        files.forEach((file) => {
            if (fs.statSync(path.resolve(dir, file)).isDirectory()) fuckingCode(path.resolve(dir, file));
            else {
                if (!filterJSOnly(file)) return;
                const flPath = path.resolve(dir, file);
                const scriptContent = fs.readFileSync(flPath, {
                    'encoding': 'utf8',
                });
                const fucked = JSFuck.encode(scriptContent);
                fs.writeFileSync(flPath, fucked);
            }
        });
    });
};

const targetDir = path.join(__dirname, 'dist');
fuckingCode(targetDir);