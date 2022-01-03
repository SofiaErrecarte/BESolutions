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
  // ParseIntPipe,
} from '@nestjs/common';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

import { UserService } from './../services/user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}

  @Get()
  getusers(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    // return {
    //   message: `users limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    // };
    return this.usersService.findAll();
  }

  @Get('filter')
  getuserFilter() {
    return `yo soy un filter`;
  }

  @Get(':userId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('userId', ParseIntPipe) userId: number) {
    // response.status(200).send({
    //   message: `user ${userId}`,
    // });
    return this.usersService.findOne(userId);
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOrderByUser(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    // return {
    //   message: 'accion de crear',
    //   payload,
    // };
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
