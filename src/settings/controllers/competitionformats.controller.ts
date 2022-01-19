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

import { CompetitionformatsService } from '../services/competitionformats.service';
import {
  CreateCompetitionformatDto,
  UpdateCompetitionformatDto,
  FilterCompetitionformatDto,
} from '../dtos/competitionformat.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';

@ApiTags('set_competitionformats') // le pone el nombre a la tabla de la base de datos que queremos
@UseGuards(JwtAuthGuard) // obliga a todas las rutas de este controlador obliga a que venga un token
@Controller('competitionformats')
export class CompetitionformatsController {
  constructor(private competitionformatsService: CompetitionformatsService) {}

  @Get()
  //@Public() si queresmos que esta ruta no necesite un token le ponemos este decorador
  @ApiOperation({ summary: 'List of competitionformats' }) // comentario en la documentacion
  findAll(@Query() params: FilterCompetitionformatDto) {
    return this.competitionformatsService.findAll(params);
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.competitionformatsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCompetitionformatDto) {
    return this.competitionformatsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCompetitionformatDto,
  ) {
    return this.competitionformatsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.competitionformatsService.remove(+id);
  }
}
