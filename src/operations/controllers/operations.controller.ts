<<<<<<< HEAD
import {
  Controller,
  Get,
=======
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Query,
>>>>>>> sofi
  Param,
  Post,
  Body,
  Put,
  Delete,
<<<<<<< HEAD
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateOperationDto, UpdateOperationDto } from '../dtos/operation.dtos';
import { OperationsService } from '../services/operations.service';

@ApiTags('operations') // le pone el nombre a la tabla de la base de datos que queremos
@Controller('operations')
export class OperationsController {
  constructor(private operationsService: OperationsService) {}

  @Get()
  @ApiOperation({ summary: 'List of operations' }) // comentario en la documentacion
  findAll() {
    return this.operationsService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.operationsService.findOne(id);
=======
  HttpStatus,
  HttpCode,
  Res,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

//import { ParseIntPipe } from '../../common/parse-int.pipe';
import {
  CreateOperationDto,
  UpdateOperationDto,
  FilterOperationDto
} from '../dtos/operation.dtos';
import { OperationsService } from './../services/operations.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
// import { RoleGuard } from 'src/auth/guards/role.guard';

import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('pperations') // le pone el nombre del tag en la documentacion
@Controller('operations')
export class OperationsController {
  constructor(private operationService: OperationsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of Operations' }) // comentario en la documentacion
  getOperations(@Query() params: FilterOperationDto) {
    return this.operationService.findAll();
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.operationService.findOne(id);
>>>>>>> sofi
  }

  @Post()
  create(@Body() payload: CreateOperationDto) {
<<<<<<< HEAD
    return this.operationsService.create(payload);
=======
    return this.operationService.create(payload);
>>>>>>> sofi
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOperationDto,
  ) {
<<<<<<< HEAD
    return this.operationsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.operationsService.remove(+id);
  }
=======
    return this.operationService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.operationService.remove(id);
  }

>>>>>>> sofi
}
