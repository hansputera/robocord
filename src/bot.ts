import { Client } from "./client";
import { Util } from "./utils";

const bot = new Client('', {
    intents: [
        Util.intents.GUILD, Util.intents.GUILD_MESSAGES
    ],
});

bot.on('raw', (chunk) => {
    console.log(chunk);
});

bot.run();