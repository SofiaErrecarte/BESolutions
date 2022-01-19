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

import { SystemsService } from '../services/systems.service';
import {
  CreateSystemDto,
  UpdateSystemDto,
  FilterSystemDto,
} from '../dtos/system.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';

@ApiTags('set_systems') // le pone el nombre a la tabla de la base de datos que queremos
@UseGuards(JwtAuthGuard) // obliga a todas las rutas de este controlador obliga a que venga un token
@Controller('systems')
export class SystemsController {
  constructor(private systemsService: SystemsService) {}

  @Get()
  //@Public() si queresmos que esta ruta no necesite un token le ponemos este decorador
  @ApiOperation({ summary: 'List of systems' }) // comentario en la documentacion
  findAll(@Query() params: FilterSystemDto) {
    return this.systemsService.findAll(params);
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.systemsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateSystemDto) {
    return this.systemsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSystemDto,
  ) {
    return this.systemsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.systemsService.remove(+id);
  }
}
