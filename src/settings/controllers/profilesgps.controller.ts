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

import { ProfilesgpsService } from '../services/profilesgps.service';
import {
  CreateProfilegpsDto,
  UpdateProfilegpsDto,
  FilterProfilegpsDto,
} from '../dtos/profilegps.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';

@ApiTags('set_profilesgps') // le pone el nombre a la tabla de la base de datos que queremos
@UseGuards(JwtAuthGuard) // obliga a todas las rutas de este controlador obliga a que venga un token
@Controller('profilesgps')
export class ProfilesgpsController {
  constructor(private profilesgpsService: ProfilesgpsService) {}

  @Get()
  //@Public() si queresmos que esta ruta no necesite un token le ponemos este decorador
  @ApiOperation({ summary: 'List of profilesgps' }) // comentario en la documentacion
  findAll(@Query() params: FilterProfilegpsDto) {
    return this.profilesgpsService.findAll(params);
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.profilesgpsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProfilegpsDto) {
    return this.profilesgpsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProfilegpsDto,
  ) {
    return this.profilesgpsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profilesgpsService.remove(+id);
  }
}
