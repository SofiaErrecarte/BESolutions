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
  CreateOperationToStateDto,
  UpdateOperationToStateDto,
} from '../dtos/operationToState.dtos';
import { OperationToStateService } from '../services/operationToState.service';

@ApiTags('operationToState') // le pone el nombre a la tabla de la base de datos que queremos
@Controller('operationToState')
export class OperationToStateController {
  constructor(private operationToStateService: OperationToStateService) {}

  @Get()
  @ApiOperation({ summary: 'List of operationToState' }) // comentario en la documentacion
  findAll() {
    return this.operationToStateService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.operationToStateService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOperationToStateDto) {
    return this.operationToStateService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOperationToStateDto,
  ) {
    return this.operationToStateService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.operationToStateService.remove(+id);
  }
}
