import { Client } from "./client";
import { Util } from "./utils";

const bot = new Client('', {
    intents: [
        Util.intents.GUILD, Util.intents.GUILD_MESSAGES
    ],
});

bot.on('ready', () => {
    console.log('Saya siyapp');
});

bot.on('raw', console.log);

bot.run();