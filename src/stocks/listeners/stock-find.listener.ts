import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { StockFindEvent } from '../events/stock-find.event';

@Injectable()
export class StockFindListener {
  @OnEvent('stock.find')
  handleOrderCreatedEvent(event: StockFindEvent) {
    // handle and process "StockFindEvent" event
    console.log(event);
  }
}
