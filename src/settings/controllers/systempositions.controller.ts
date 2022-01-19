import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { SystempositionsService } from '../services/systempositions.service';
import {
  CreateSystempositionDto,
  UpdateSystempositionDto,
  FilterSystempositionDto,
} from '../dtos/systemposition.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';

@ApiTags('set_systempositions') // le pone el nombre a la tabla de la base de datos que queremos
@UseGuards(JwtAuthGuard) // obliga a todas las rutas de este controlador obliga a que venga un token
@Controller('systempositions')
export class SystempositionsController {
  constructor(private systempositionsService: SystempositionsService) {}

  @Get()
  //@Public() si queresmos que esta ruta no necesite un token le ponemos este decorador
  @ApiOperation({ summary: 'List of system positions' }) // comentario en la documentacion
  findAll(@Query() params: FilterSystempositionDto) {
    return this.systempositionsService.findAll(params);
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.systempositionsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateSystempositionDto) {
    return this.systempositionsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSystempositionDto,
  ) {
    return this.systempositionsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.systempositionsService.remove(+id);
  }
}
