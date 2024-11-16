import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';


@Controller('products')
export class ProductsController {
  constructor() {}




  @Post()
  create() {
    return 'This action adds a new product';
  }

  @Get()
  findAll() {
    return 'This action returns all products';
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
