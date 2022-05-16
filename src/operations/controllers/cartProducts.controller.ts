/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateCartProductDto,
  UpdateCartProductDto,
} from '../dtos/cartProduct.dtos';
import { Cart } from '../entities/cart.entity';
import { CartProductsService } from '../services/cartProducts.service';

@ApiTags('carts_products') // le pone el nombre a la tabla de la base de datos que queremos
@Controller('carts_products')
export class CartProductsController {
  constructor(private cartProductsService: CartProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of carts' }) // comentario en la documentacion
  findAll() {
    return this.cartProductsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartProductsService.findOne(id);
  }

  @Get('products/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.cartProductsService.findAllProducts(id);
  }

  // @Get()
  // get() {
  //   return this.cartProductsService.findAll();
  // }

  @Post()
  create(@Body() payload: CreateCartProductDto) {
    return this.cartProductsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCartProductDto,
  ) {
    return this.cartProductsService.update(id, payload);
  }



  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartProductsService.remove(+id);
  }
}
