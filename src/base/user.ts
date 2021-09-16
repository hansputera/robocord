import type { APIUser } from 'discord-api-types';

export class UserClass {
    constructor(
        private user: APIUser
    ) {}

    public id = this.user.id;
    public username = this.user.username;
    public discriminator = this.user.discriminator;
    public tag = `${this.username}#${this.discriminator}`;
    public avatar = this.user.avatar;
    public flags = this.user.flags;
    public mfaEnabled = this.user.mfa_enabled;
    public isBot = this.user.bot;
    public locale = this.user.locale;
    public banner = this.user.banner;
}