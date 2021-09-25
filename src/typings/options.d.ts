import type { AllowedMentions } from '.';

type WebsocketProperties = {
  $os: string;
  $browser: string;
  $device: string;
};

export type GatewayType = 'ws' | 'wss';
export interface WebsocketOptions {
  v?: number;
  properties?: WebsocketProperties;
}
export interface ClientOptions {
  /**
   * If logging was enabled, we will save our logging to the file.
   */
  logging?: string;
  /**
   * WebSocket Options
   *
   * @description If you do not know what are you doing, don't fill it.
   */
  ws?: WebsocketOptions;
  /**
   * Allowed intents.
   */
  intents?: number[];
  allowedMentions?: AllowedMentions[];
  /**
   * Your session file name.
   */
  sessionFile?: string;
}
