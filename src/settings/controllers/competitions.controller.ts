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

import { CompetitionsService } from '../services/competitions.service';
import { CreateCompetitionDto, UpdateCompetitionDto, FilterCompetitionDto } from '../dtos/competition.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';

@ApiTags('set_competitions') // le pone el nombre a la tabla de la base de datos que queremos
@UseGuards(JwtAuthGuard) // obliga a todas las rutas de este controlador obliga a que venga un token
@Controller('competitions')
export class CompetitionsController {
  constructor(private competitionsService: CompetitionsService) {}

  @Get()
  //@Public() si queresmos que esta ruta no necesite un token le ponemos este decorador
  @ApiOperation({ summary: 'List of competitions' }) // comentario en la documentacion
  findAll(@Query() params: FilterCompetitionDto) {
    return this.competitionsService.findAll(params);
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.competitionsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCompetitionDto) {
    return this.competitionsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCompetitionDto,
  ) {
    return this.competitionsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.competitionsService.remove(+id);
  }
}
