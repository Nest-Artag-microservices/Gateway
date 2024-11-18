import { Body, 
  Controller, Delete, Get, Inject, 
  Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { productsService } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(productsService)private readonly productsClient:ClientProxy
  ) {}

  @Post()
  create(@Body() body:CreateProductDto 
) {
    return this.productsClient.send({ cmd:'create'},{body});
  }

  @Get()
  findAll(
    @Query()
    paginationDto:PaginationDto
  ) {
    return this.productsClient.send({ cmd:'findAll'},paginationDto);
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {

try{
const product =await firstValueFrom(
  this.productsClient.send({ cmd:'findOne'},{id})
);

return product

}catch(error){
  throw new RpcException(error)
}


  }
  @Patch(':id')
  update(@Body() body:UpdateProductDto
) {
    return this.productsClient.send({ cmd:'update'},{body});
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsClient.send({ cmd:'remove'},{id});
  }



}
