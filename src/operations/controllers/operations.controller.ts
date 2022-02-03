/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
@ApiTags('operations') // le pone el nombre del tag en la documentacion
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
  }

  @Post()
  create(@Body() payload: CreateOperationDto) {
    return this.operationService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOperationDto,
  ) {
    return this.operationService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.operationService.remove(id);
  }

}
