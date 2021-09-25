"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClass = void 0;
class UserClass {
    constructor(user) {
        this.user = user;
        this.id = this.user.id;
        this.username = this.user.username;
        this.discriminator = this.user.discriminator;
        this.tag = `${this.username}#${this.discriminator}`;
        this.avatar = this.user.avatar;
        this.flags = this.user.flags;
        this.mfaEnabled = this.user.mfa_enabled;
        this.isBot = this.user.bot;
        this.locale = this.user.locale;
        this.banner = this.user.banner;
    }
    getAPIUser() {
        return this.user;
    }
}
exports.UserClass = UserClass;
