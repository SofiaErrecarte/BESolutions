import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { PricesService } from '../services/prices.service';
import { CreatePriceDto, UpdatePriceDto } from './../dtos/prices.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@ApiTags('prices') // le pone el nombre a la tabla de la base de datos que queremos
@UseGuards(JwtAuthGuard) // obliga a todas las rutas de este controlador obliga a que venga un token
@Controller('prices')
export class PricesController {
  constructor(private pricesService: PricesService) {}

  @Get()
  @ApiOperation({ summary: 'List of prices' }) // comentario en la documentacion
  findAll() {
    return this.pricesService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.pricesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreatePriceDto) {
    return this.pricesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdatePriceDto,
  ) {
    return this.pricesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pricesService.remove(+id);
  }
}
