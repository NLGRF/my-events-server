import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventGateway } from './event/event.gateway';
import { StocksModule } from './stocks/stocks.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot(), StocksModule],
  controllers: [AppController],
  providers: [EventGateway, AppService],
  // providers: [AppService],
})
export class AppModule {}
