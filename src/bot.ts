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
        name: 'Upin Ipin',
        type: 'WATCHING',
    });
});

bot.on('newMessage', (m) => {
    console.log('Pesan baru:', m.id);
});

bot.on('reconnect', () => {
    console.log('Reconnecting');
});

bot.run();