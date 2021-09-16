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
    console.log('Pesan baru dari:', m.author.tag, 'yaitu: \'', m.content, '\'');
});
bot.on('updateMessage', (oldMsg, n) => {
    console.log('Pesan di edit dari:', oldMsg.author.tag, '\nkonten lama:', oldMsg.content, '\nkonten baru:', n.content);
});
bot.on('deletedMessage', (m) => {
    console.log('pesan di delete:', m.author.tag);
});
bot.on('raw', console.log);

bot.run();