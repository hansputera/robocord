import _ from "lodash";
<<<<<<< HEAD
import { ActionRowButtonBuilder, ButtonBuilder, MenuComponentBuilder } from "./componentBuilder";
=======
import { ActionRowButtonBuilder, ButtonComponentBuilder, MenuComponentBuilder } from "./componentBuilder";
>>>>>>> a7e3a90579be2f29239a5706e1da54b5d652f016
import { EmbedBuilder } from "./embedBuilder";
import { Formatter } from "./formatter";

const MessageTypes = {
    "0": "DEFAULT",
    "1": "RECIPIENT_ADD",
    "2": "RECIPIENT_REMOVE",
    "3": "CALL",
    "4": "CHANNEL_NAME_CHANGE",
    "5": "CHANNEL_ICON_CHANGE",
    "6": "CHANNEL_PINNED_MESSAGE",
    "7": "GUILD_MEMBER_JOIN",
    "8": "USER_PREMIUM_GUILD_SUBSCRIPTION",
    "9": "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1",
    "10": "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2",
    "11": "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3",
    "12": "CHANNEL_FOLLOW_ADD",
    "14": "GUILD_DISCOVERY_DISQUALIFIED",
    "15": "GUILD_DISCOVERY_REQUALIFIED",
    "16": "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING",
    "17": "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING",
    "18": "THREAD_CREATED",
    "19": "REPLY",
    "20": "CHAT_INPUT_COMMAND",
    "21": "THREAD_STARTER_MESSAGE",
    "22": "GUILD_INVITE_REMINDER",
    "23": "CONTEXT_MENU_COMMAND"
};
const Intents = {
    'GUILD': 1 << 0,
    'GUILD_MEMBERS': 1 << 1,
    'GUILD_BANS': 1 << 2,
    'GUILD_EMOJIS_AND_STICKERS': 1 < 3,
    'GUILD_INTEGRATIONS': 1 << 4,
    'GUILD_WEBHOOKS': 1 << 5,
    'GUILD_INVITE': 1 << 6,
    'GUILD_VOICE_STATES': 1 << 7,
    'GUILD_PRESENCES': 1 << 8,
    'GUILD_MESSAGES': 1 << 9,
    'GUILD_MESSAGE_REACTIONS': 1 << 10,
    'GUILD_MESSAGE_TYPING': 1 << 11,
    'DIRECT_MESSAGES': 1 << 12,
    'DIRECT_MESSAGE_REACTIONS': 1 << 13,
    'DIRECT_MESSAGE_TYPING': 1 << 14,
};
const MessageComponentTypes = {
    'action': 1,
    'button': 2,
    'menu': 3,
};
const GatewayOpCodes = {
    'DISPATCH': 0,
    'HEARTBEAT': 1,
    'IDENTIFY': 2,
    'PRESENCE_UPDATE': 3,
    'VOICE_STATE_UPDATE': 4,
    'RESUME': 6,
    'RECONNECT': 7,
    'REQUEST_GUILD_MEMBERS': 8,
    'INVALID_SESSION': 9,
    'HELLO': 10,
    'HEARTBEAT_ACK': 11,
};
const ChannelTypes = {
    '0': 'text',
    '1': 'dm',
    '2': 'voice',
    '3': 'dm_group',
    '4': 'category',
    '5': 'news',
    '6': 'store',
    '10': 'thread_news',
    '11': 'thread_public',
    '13': 'voice_stage',
};
const MessageComponentButtonStyles = {
    'primary': 1,
    'secondary': 2,
    'success': 3,
    'danger': 4,
    'link': 5,
}
export class Util {
    static EmbedBuilder = EmbedBuilder;
<<<<<<< HEAD
    static ButtonComponentBuilder = ButtonBuilder;
=======
    static ButtonComponentBuilder = ButtonComponentBuilder;
>>>>>>> a7e3a90579be2f29239a5706e1da54b5d652f016
    static MenuComponentBuilder = MenuComponentBuilder;
    static ActionRowComponentBuilder = ActionRowButtonBuilder;
    static formatter = Formatter;
    static intents = Intents;
    static opcodes = {
        'gateway': GatewayOpCodes,
    };
    static channelTypes = ChannelTypes;
    static messageTypes = MessageTypes;
    static messageComponentTypes = MessageComponentTypes;
    static messageComponentButtonStyles = MessageComponentButtonStyles;
    static lodash = _;
};
