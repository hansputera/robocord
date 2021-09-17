/**
 * Example.
 */
 
import { Client } from "./client";
import { Util } from "./utils";

const bot = new Client('', {
    intents: [
        Util.intents.GUILD, Util.intents.GUILD_MESSAGES
    ], 
});

bot.on('ready', () => {
    console.log('Saya siyapp');

    bot.user.setActivity('dnd', {
        name: `${bot.caches.guild.size} server(s)`,
        type: 'WATCHING',
    });
});

bot.on('newMessage', async (m) => {
    if (m.author.id != bot.user.id && m.content.toLowerCase() === 'yudha') {
        await m.send('horny');
    }
});

bot.on('reconnect', () => {
    console.log('Reconnecting');
});

bot.run();