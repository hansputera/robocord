import { readdirSync, statSync } from 'fs';
import path from 'path';
import { CacheService } from '../../services/cache';
import type { BaseEvent } from '../baseEvent';

export class LoaderEvent {
  private blacklistFiles = ['loader'];

  private _events: CacheService<string, BaseEvent> = new CacheService({
    ttl: 60 * 30 * 1000,
    max: 100,
    clock: Date,
  });

  public runEvent(_event: BaseEvent, methodName: string, args?: unknown[]) {
    try {
      eval(`_event.${methodName}(${args ? args.join(', ') : ''});`);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public loadEvent(eventName: string): BaseEvent {
    const location = path.resolve(__dirname, eventName);
    try {
      const ev: BaseEvent = new (require(location).default)();
      return ev;
    } catch {
      return undefined;
    }
  }

  public searchEvent(t: string[] | string) {
    const temp_event: BaseEvent[] = [];
    this._events.toArray().forEach((event) => {
      if (Array.isArray(t)) {
        t.forEach((evt) => {
          if (event.eventRequired.includes(evt)) temp_event.push(event);
        });
      } else {
        if (event.eventRequired.includes(t)) temp_event.push(event);
      }
    });

    return [...new Set(temp_event)]; // prevent duplicates event.
  }

  public load() {
    if (this._events.toArray().length) this._events.flush();
    const files = readdirSync(path.resolve(__dirname));
    files
      .filter(
        (fl) =>
          !statSync(path.resolve(__dirname, fl)).isDirectory() &&
          !this.blacklistFiles.includes(fl.split('.').at(0))
      )
      .forEach((file) => {
        if (require(path.resolve(__dirname, file)).default) {
          const fl: BaseEvent = new (require(path.resolve(
            __dirname,
            file
          )).default)();
          const name = file.split('.').at(0);
          fl.name = name;
          this._events.set(name, fl);
        }
      });
  }
}
