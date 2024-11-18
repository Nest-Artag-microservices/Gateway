import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { orderService } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';


@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(orderService)private readonly ordersClient:ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder',createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersClient.send('findAllOrders',{});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send('findOneOrder',id);
  }

 
}
