import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { Stock } from '../stocks/entities/stock.entity';
import { CreateStockDto } from '../stocks/dto/create-stock.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  public stocks: Stock[] = [
    {
      id: 1,
      symbol: 'Stock #1',
      bid: 500,
      ask: 500,
    },
    {
      id: 2,
      symbol: 'Order #2',
      bid: 500,
      ask: 500,
    },
  ];
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }
  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: CreateStockDto) {
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });
    const stock = {
      id: this.stocks.length + 1,
      ...body,
    };
    this.stocks.push(stock);
    console.log('Your current stocks:', this.stocks);
    return this.stocks;
  }
}
