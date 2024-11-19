import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { orderService } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';


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
  findAll(@Query()orderPaginationDto:OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders',orderPaginationDto);
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe ) id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id })
      );

      return order;

    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Get("status/:status")
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query()PaginationDto:PaginationDto) {

    try{
      return this.ordersClient.send('findAllOrders',{
        ...PaginationDto,
        status:statusDto.status
      });
    }catch(error){
      throw new RpcException(error)
    }
  }
 
}
