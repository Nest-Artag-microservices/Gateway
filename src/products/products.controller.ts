import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { productsService } from 'src/config';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(productsService)private readonly productsClient:ClientProxy
  ) {}




  @Post()
  create() {
    return 'This action adds a new product';
  }

  @Get()
  findAll(
    @Query()
    paginationDto:PaginationDto
  ) {
    return this.productsClient.send({ cmd:'findAll'},paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'This action returns a #${id} product';
  }
  @Patch(':id')
  update(@Body() body:any) {
    return 'This action updates a #${id} product';
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'This action removes a #${id} product';
  }



}
