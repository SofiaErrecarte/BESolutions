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
import { CreateOperationDto, UpdateOperationDto } from '../dtos/operation.dtos';
import { OperationsService } from '../services/operations.service';

@ApiTags('operations') // le pone el nombre a la tabla de la base de datos que queremos
@Controller('operations')
export class OperationsController {
  constructor(private operationsService: OperationsService) {}

  @Get()
  @ApiOperation({ summary: 'List of operations' }) // comentario en la documentacion
  findAll() {
    return this.operationsService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.operationsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOperationDto) {
    return this.operationsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOperationDto,
  ) {
    return this.operationsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.operationsService.remove(+id);
  }
}
