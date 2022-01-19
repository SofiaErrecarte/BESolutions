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

import { TeamsService } from '../services/teams.service';
import { CreateTeamDto, UpdateTeamDto, FilterTeamDto } from '../dtos/team.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';

@ApiTags('set_teams') // le pone el nombre a la tabla de la base de datos que queremos
@UseGuards(JwtAuthGuard) // obliga a todas las rutas de este controlador obliga a que venga un token
@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Get()
  //@Public() si queresmos que esta ruta no necesite un token le ponemos este decorador
  @ApiOperation({ summary: 'List of teams' }) // comentario en la documentacion
  findAll(@Query() params: FilterTeamDto) {
    return this.teamsService.findAll(params);
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateTeamDto) {
    return this.teamsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTeamDto,
  ) {
    return this.teamsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.remove(+id);
  }
}
