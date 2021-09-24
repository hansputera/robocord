import type { APIMessage } from 'discord-api-types';
import { MessageClass } from '../../../base/message';
import type { Client } from '../../../client';

export class MessageClassRest extends MessageClass {
  constructor(private client: Client, msg: APIMessage) {
    super(msg);

    this.api = msg;
  }
  public api: APIMessage;

  public async getGuild() {
    return await this.client.guildResource.fetch(this.guildID);
  }
}
