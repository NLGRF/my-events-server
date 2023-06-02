import { Controller, Get, Sse, MessageEvent } from '@nestjs/common';
import { AppService } from './app.service';
import { fromEvent, interval, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { StockCreatedEvent } from './stocks/events/stock-created.event';
import { log } from 'console';

class SseEvent<T> {
  constructor(public data: T) {}
  // constructor(public eventName: string, public data: T) {}
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private eventEmitter2: EventEmitter2,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Sse('sse')
  sse(): Observable<SseEvent<string>> {
    return new Observable<SseEvent<string>>((observer) => {
      const eventEmitter = this.eventEmitter2;
      const eventName = 'stock.created';

      const handler = (data: string) => {
        observer.next({ data });
        // observer.next(new SseEvent(eventName, data));
      };

      eventEmitter.on(eventName, handler);

      return () => {
        eventEmitter.off(eventName, handler);
      };
    });
  }

  @Sse('stocksFind')
  stocksFind(): Observable<SseEvent<string>> {
    return new Observable<SseEvent<string>>((observer) => {
      const eventEmitter = this.eventEmitter2;
      const eventName = 'stock.find';

      const handler = (data: string) => {
        observer.next({ data });
        // observer.next(new SseEvent(eventName, data));
      };

      eventEmitter.on(eventName, handler);

      return () => {
        eventEmitter.off(eventName, handler);
      };
    });
  }

  // @Sse('sse')
  // @OnEvent('stock.created')
  // sse(event: StockCreatedEvent): Observable<MessageEvent> {
  //   const obj = of(event);
  //   return obj.pipe(map((data) => ({ data: event })));
  // }
}
