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
import { CreateDeliveryDto, UpdateDeliveryDto } from '../dtos/delivery.dtos';
import { DeliveriesService } from '../services/delivery.service';

@ApiTags('deliveries') // le pone el nombre a la tabla de la base de datos que queremos
@Controller('deliveries')
export class DeliveryController {
  constructor(private deliveriesService: DeliveriesService) {}

  @Get()
  @ApiOperation({ summary: 'List of deliverys' }) // comentario en la documentacion
  findAll() {
    return this.deliveriesService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.deliveriesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateDeliveryDto) {
    return this.deliveriesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDeliveryDto,
  ) {
    return this.deliveriesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deliveriesService.remove(+id);
  }
}
