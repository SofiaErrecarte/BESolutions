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
  CreateDeliveryToStateDto,
  UpdateDeliveryToStateDto,
} from '../dtos/deliveryToState.dtos';
import { DeliveryToStateService } from '../services/deliveryToState.service';

@ApiTags('deliveryToState') // le pone el nombre a la tabla de la base de datos que queremos
@Controller('deliveryToState')
export class DeliveryToStateController {
  constructor(private deliveryToStateService: DeliveryToStateService) {}

  @Get()
  @ApiOperation({ summary: 'List of deliveryToState' }) // comentario en la documentacion
  findAll() {
    return this.deliveryToStateService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryToStateService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateDeliveryToStateDto) {
    return this.deliveryToStateService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDeliveryToStateDto,
  ) {
    return this.deliveryToStateService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryToStateService.remove(+id);
  }
}
