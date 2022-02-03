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

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto, FilterUserDto } from '../dtos/user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
// import { Public } from 'src/auth/decorators/public.decorator';
//import { Public } from '../../auth/decorators/public.decorator'; //importar para que una ruta no necesite el token

@ApiTags('users') // le pone el nombre a la tabla de la base de datos que queremos
@UseGuards(JwtAuthGuard) // obliga a todas las rutas de este controlador obliga a que venga un token
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  // @Public()
  //@Public() //si queresmos que esta ruta no necesite un token le ponemos este decorador
  @ApiOperation({ summary: 'List of users' }) // comentario en la documentacion
  findAll(@Query() params: FilterUserDto) {
    return this.usersService.findAll(params);
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  // @Public()
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  // @Public()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
