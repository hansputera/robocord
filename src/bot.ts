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
        const buttonComponent = new Util.ButtonComponentBuilder();
    
        const instance1 = buttonComponent.createInstance()
        .setID('yudha')
        .setStyle('primary')
        .setLabel('Yudha')
        .toggle();

        const instance2 = buttonComponent.createInstance()
        .setID('hanif')
        .setStyle('success')
        .setLabel('Hanif button')
        .toggle();

        buttonComponent.addInstance(instance1, instance2);
        
        const actionRow = new Util.ActionRowComponentBuilder();
        actionRow.addInstancePlain(instance1.toJSON(), instance2.toJSON());

        await m.sendAPI({
            components: actionRow.build(),
            content: 'Hello world',
        });
    }
});

bot.on('reconnect', () => {
    console.log('Reconnecting');
});

bot.run();