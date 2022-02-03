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
import { CreateStateDto, UpdateStateDto } from '../dtos/state.dtos';
import { StateService } from '../services/state.service';

@ApiTags('states') // le pone el nombre a la tabla de la base de datos que queremos
@Controller('state')
export class StateController {
  constructor(private statesService: StateService) {}

  @Get()
  @ApiOperation({ summary: 'List of states' }) // comentario en la documentacion
  findAll() {
    return this.statesService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.statesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateStateDto) {
    return this.statesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateStateDto,
  ) {
    return this.statesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.statesService.remove(+id);
  }
}
