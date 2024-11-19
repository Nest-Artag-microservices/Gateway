import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { orderService } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';


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
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try{
    const order =await firstValueFrom(
    this.ordersClient.send('findOneOrder',id)
    ); 
    return order;
    
    }catch(error){}
  }

 
}
