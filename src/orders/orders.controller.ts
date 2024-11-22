import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { NATS_SERVICE, } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';


@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE)private readonly clients:ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.clients.send('createOrder',createOrderDto);
  }

  @Get()
  async findAll(@Query()orderPaginationDto:OrderPaginationDto) {

    try {
      const orders = await firstValueFrom(
        this.clients.send('findAllOrders', orderPaginationDto)
      )
      return orders;

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe ) id: string) {
    try {
      const order = await firstValueFrom(
        this.clients.send('findOneOrder', { id })
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
      return this.clients.send('findAllOrders',{
        ...PaginationDto,
        status:statusDto.status
      });
    }catch(error){
      throw new RpcException(error)
    }
  }
 @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ){
try{
return this.clients.send('changeOrderStatus', {
  id,
  status: statusDto.status
})
}catch(error){
  throw new RpcException(error)
}
  }
}
