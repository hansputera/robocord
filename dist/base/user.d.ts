import type { APIUser } from 'discord-api-types';
export declare class UserClass {
    private user;
    constructor(user: APIUser);
    id: string;
    username: string;
    discriminator: string;
    tag: string;
    avatar: string;
    flags: import("discord-api-types").UserFlags;
    mfaEnabled: boolean;
    isBot: boolean;
    locale: string;
    banner: string;
    getAPIUser(): APIUser;
}
