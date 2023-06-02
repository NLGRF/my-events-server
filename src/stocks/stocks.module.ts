import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { StockCreatedListener } from './listeners/stock-created.listener';
import { StockFindListener } from './listeners/stock-find.listener';

@Module({
  controllers: [StocksController],
  providers: [StocksService, StockCreatedListener, StockFindListener],
})
export class StocksModule {}
