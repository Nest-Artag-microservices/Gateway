import { Body, 
  Controller, Delete, Get, Inject, 
  Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError,firstValueFrom } from 'rxjs';
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
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send(
      { cmd: 'create_product' },
      createProductDto,
    );
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
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    
    return this.productsClient
      .send(
        { cmd: 'update_product' },
        {
          id,
          ...updateProductDto,
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsClient.send({ cmd:'remove'},{id});
  }



}
