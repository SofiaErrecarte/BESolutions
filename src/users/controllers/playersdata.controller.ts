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

import { PlayersdataService } from '../services/playersdata.service';
import {
  CreatePlayerdataDto,
  UpdatePlayerdataDto,
} from '../dtos/playerdata.dto';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('playersdata') // le pone el nombre a la tabla de la base de datos que queremos
@Controller('playersdata')
export class PlayersdataController {
  constructor(private playersdataService: PlayersdataService) {}

  @Get()
  @ApiOperation({ summary: 'List of Player data' }) // comentario en la documentacion
  findAll() {
    return this.playersdataService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.playersdataService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreatePlayerdataDto) {
    return this.playersdataService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdatePlayerdataDto,
  ) {
    return this.playersdataService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.playersdataService.remove(+id);
  }
}
