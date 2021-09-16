import { Client } from "./client";
import { Util } from "./utils";

const bot = new Client('ODc5MzE5NTcwOTIwNDA3MDQw.YSOAKg.g7EQ7JNoCxMzX5Da3Mw97BVjOGA', {
    intents: [
        Util.intents.GUILD, Util.intents.GUILD_MESSAGES
    ],
});

bot.on('ready', () => {
    console.log('Saya siyapp');
});

bot.on('raw', console.log);

bot.run();