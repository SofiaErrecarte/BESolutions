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

import { CreateOperationProductDto, UpdateOperationProductDto, DeleteOperationProductDto } from '../dtos/operationProduct.dtos';
import { Cart } from '../entities/cart.entity';
import { CartProductsService } from '../services/cartProducts.service';
import { OperationProductsService } from '../services/operationProducts.service';

@ApiTags('operation_products') // le pone el nombre a la tabla de la base de datos que queremos
@Controller('operation_products')
export class OperationProductsController {
  constructor(private operationProductService: OperationProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of carts' }) // comentario en la documentacion
  findAll() {
    return this.operationProductService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.operationProductService.findOne(id);
  }

  @Get('products/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.operationProductService.findAllProducts(id);
  }


  @Post()
  create(@Body() payload: CreateOperationProductDto) {
    return this.operationProductService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOperationProductDto,
  ) {
    return this.operationProductService.update(id, payload);
  }



  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number,
  @Body() payload: DeleteOperationProductDto, ) {
    return this.operationProductService.remove(+id, payload);
  }
}
