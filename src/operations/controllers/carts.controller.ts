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
import { User } from 'src/users/entities/user.entity';
import { CreateCartDto, UpdateCartDto } from '../dtos/cart.dtos';
import { CartsService } from '../services/carts.service';

@ApiTags('carts') // le pone el nombre a la tabla de la base de datos que queremos
@Controller('carts')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Get()
  @ApiOperation({ summary: 'List of carts' }) // comentario en la documentacion
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartsService.findOne(id);
  }

  @Get('user/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.cartsService.findByUser(id);
  }

  @Post()
  create(@Body() payload: CreateCartDto) {
    return this.cartsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCartDto,
  ) {
    return this.cartsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartsService.remove(+id);
  }
}
