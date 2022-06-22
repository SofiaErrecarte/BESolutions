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
import { CreatePriceCitiesDto, UpdatePriceCitiesDto } from '../dtos/pricecities.dtos';
import { PriceCitiesService } from '../services/pricecities.service';

@ApiTags('pricecities') // le pone el nombre a la tabla de la base de datos que queremos
@Controller('pricecities')
export class PriceCitiesController {
  constructor(private pricecitiesService: PriceCitiesService) {}

  @Get()
  @ApiOperation({ summary: 'List of pricecities' }) // comentario en la documentacion
  findAll() {
    return this.pricecitiesService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.pricecitiesService.findOne(id);
  }

  @Get('/cp/:idO/:idD')
  getByCp(
    @Param('idO') idO: string,
    @Param('idD') idD: string
  ) {
    return this.pricecitiesService.finByCP(idO,idD);
  }

  @Post()
  create(@Body() payload: CreatePriceCitiesDto) {
    return this.pricecitiesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdatePriceCitiesDto,
  ) {
    return this.pricecitiesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pricecitiesService.remove(+id);
  }
}
