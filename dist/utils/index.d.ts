import chalk from 'chalk';
import _ from 'lodash';
import ColorConvert from 'color-convert';
import { ActionRowButtonBuilder, MenuComponentBuilder } from './componentBuilder';
import { EmbedBuilder } from './embedBuilder';
import { Formatter } from './formatter';
export declare class Util {
    static EmbedBuilder: typeof EmbedBuilder;
    static MenuComponentBuilder: typeof MenuComponentBuilder;
    static ActionRowComponentBuilder: typeof ActionRowButtonBuilder;
    static formatter: typeof Formatter;
    static intents: {
        GUILD: number;
        GUILD_MEMBERS: number;
        GUILD_BANS: number;
        GUILD_EMOJIS_AND_STICKERS: boolean;
        GUILD_INTEGRATIONS: number;
        GUILD_WEBHOOKS: number;
        GUILD_INVITE: number;
        GUILD_VOICE_STATES: number;
        GUILD_PRESENCES: number;
        GUILD_MESSAGES: number;
        GUILD_MESSAGE_REACTIONS: number;
        GUILD_MESSAGE_TYPING: number;
        DIRECT_MESSAGES: number;
        DIRECT_MESSAGE_REACTIONS: number;
        DIRECT_MESSAGE_TYPING: number;
    };
    static opcodes: {
        gateway: {
            DISPATCH: number;
            HEARTBEAT: number;
            IDENTIFY: number;
            PRESENCE_UPDATE: number;
            VOICE_STATE_UPDATE: number;
            RESUME: number;
            RECONNECT: number;
            REQUEST_GUILD_MEMBERS: number;
            INVALID_SESSION: number;
            HELLO: number;
            HEARTBEAT_ACK: number;
            SYNC_GUILD: number;
            SYNC_CALL: number;
        };
    };
    static channelTypes: {
        '0': string;
        '1': string;
        '2': string;
        '3': string;
        '4': string;
        '5': string;
        '6': string;
        '10': string;
        '11': string;
        '13': string;
    };
    static messageTypes: {
        '0': string;
        '1': string;
        '2': string;
        '3': string;
        '4': string;
        '5': string;
        '6': string;
        '7': string;
        '8': string;
        '9': string;
        '10': string;
        '11': string;
        '12': string;
        '14': string;
        '15': string;
        '16': string;
        '17': string;
        '18': string;
        '19': string;
        '20': string;
        '21': string;
        '22': string;
        '23': string;
    };
    static messageComponentTypes: {
        action: number;
        button: number;
        menu: number;
    };
    static messageComponentButtonStyles: {
        primary: number;
        secondary: number;
        success: number;
        danger: number;
        link: number;
    };
    static lodash: _.LoDashStatic;
    static chalk: chalk.Chalk & chalk.ChalkFunction & {
        supportsColor: false | chalk.ColorSupport;
        Level: chalk.Level;
        Color: ("black" | "blue" | "cyan" | "gray" | "green" | "grey" | "magenta" | "red" | "white" | "yellow" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright") | ("bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright");
        ForegroundColor: "black" | "blue" | "cyan" | "gray" | "green" | "grey" | "magenta" | "red" | "white" | "yellow" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright";
        BackgroundColor: "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright";
        Modifiers: "bold" | "reset" | "dim" | "italic" | "underline" | "inverse" | "hidden" | "strikethrough" | "visible";
        stderr: chalk.Chalk & {
            supportsColor: false | chalk.ColorSupport;
        };
    };
    static colorConvert: typeof ColorConvert;
    static globalStore: Map<any, any>;
}
