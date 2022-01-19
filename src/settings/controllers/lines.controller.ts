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

import { LinesService } from '../services/lines.service';
import { CreateLineDto, UpdateLineDto, FilterLineDto } from '../dtos/line.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';

@ApiTags('set_lines') // le pone el nombre a la tabla de la base de datos que queremos
@UseGuards(JwtAuthGuard) // obliga a todas las rutas de este controlador obliga a que venga un token
@Controller('lines')
export class LinesController {
  constructor(private linesService: LinesService) {}

  @Get()
  //@Public() si queresmos que esta ruta no necesite un token le ponemos este decorador
  @ApiOperation({ summary: 'List of lines' }) // comentario en la documentacion
  findAll(@Query() params: FilterLineDto) {
    return this.linesService.findAll(params);
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.linesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateLineDto) {
    return this.linesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateLineDto,
  ) {
    return this.linesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.linesService.remove(+id);
  }
}
