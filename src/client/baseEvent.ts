import type { Client } from '../client';
import type { BaseEventImplement, Raw } from '../typings';

export abstract class BaseEvent implements BaseEventImplement {
  public name: string = '';
  public eventRequired = [];
  public eventAction = {};

  protected client: Client;
  protected raw: Raw;

  public setRaw(raw: Raw) {
    this.raw = raw;
  }

  public setClient(client: Client) {
    this.client = client;
  }
}
