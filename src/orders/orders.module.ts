import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, orderService} from 'src/config';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([

      {
        name: orderService, 
        transport: Transport.TCP,
        options: {
       //   host: envs.orderMicroserviceHost,
         // port: envs.orderMicroservicePort,
        },
       },
    ]),
  ],
})
export class OrdersModule {}
