import { Injectable } from '@nestjs/common';
import { Stock } from './entities/stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StockCreatedEvent } from './events/stock-created.event';
import { StockFindEvent } from './events/stock-find.event';
@Injectable()
export class StocksService {
  public stocks: Stock[] = [
    {
      id: 1,
      symbol: 'Stock #1',
      bid: 500,
      ask: 500,
    },
  ];

  constructor(private eventEmitter: EventEmitter2) {}

  create(createStockDto: CreateStockDto) {
    if (this.stocks.find((stock) => stock.symbol === createStockDto.symbol)) {
      throw new Error('Stock already exists');
    }
    const stock = {
      id: this.stocks.length + 1,
      ...createStockDto,
    };
    this.stocks.push(stock);

    // const stockCreatedEvent = new CreateStockDto();
    const stockCreatedEvent = new StockCreatedEvent();
    stockCreatedEvent.symbol = stock.symbol;
    stockCreatedEvent.ask = stock.ask;
    stockCreatedEvent.bid = stock.bid;

    this.eventEmitter.emit('stock.created', stockCreatedEvent);

    return stock;
  }

  findAll() {
    // const stockFindEvent = new StockFindEvent();

    this.eventEmitter.emit('stock.find', this.stocks);

    return this.stocks;
  }
}
