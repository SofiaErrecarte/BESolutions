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

@ApiTags('deliverys') // le pone el nombre a la tabla de la base de datos que queremos
@Controller('delivery')
export class DeliveryController {
  constructor(private deliverysService: DeliveriesService) {}

  @Get()
  @ApiOperation({ summary: 'List of deliverys' }) // comentario en la documentacion
  findAll() {
    return this.deliverysService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.deliverysService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateDeliveryDto) {
    return this.deliverysService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDeliveryDto,
  ) {
    return this.deliverysService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deliverysService.remove(+id);
  }
}
