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
import { CreateCartDto, UpdateCartDto } from '../dtos/cart.dtos';
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
  get(@Param('id', ParseIntPipe) id: number) {
    return this.cartProductsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCartDto) {
    return this.cartProductsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCartDto,
  ) {
    return this.cartProductsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartProductsService.remove(+id);
  }
}
