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
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
  ExistsProductDto,
} from '../dtos/products.dtos';
import { ProductsService } from './../services/products.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
// import { RoleGuard } from 'src/auth/guards/role.guard';

import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard)
@ApiTags('products') // le pone el nombre del tag en la documentacion
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of products' }) // comentario en la documentacion
  // getProducts(@Query() params: FilterProductDto) {
  //   return this.productsService.findAll();
  // }
  // getProducts() {
  //   return this.productsService.findAll();
  // }
  getProducts(@Query() filterQuery) {
    return this.productsService.findAll();
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of products' }) // comentario en la documentacion
  // getProducts(@Query() params: FilterProductDto) {
  //   return this.productsService.findAll();
  // }
  getProductsFiltered(@Query() filterQuery) {
    return this.productsService.findAll(filterQuery);
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Public()
  @Get('seller/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getBySeller(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findBySeller(id);
  }

  // @Roles(Role.ADMIN)
  // @Public()
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Public()
  @Get('cart_products/:id')
  get(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: ExistsProductDto) {
    return this.productsService.itemExists(id, payload);
  }

  // acá también no habría que definir que el rol sea admin?
  // @Public()
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(+id, payload);
  }
  
  // @Put(':id')
  // updateStock(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() quantity:number,
  // ) {
  //   return this.productsService.updateStock(id, quantity);
  // }

  // @Public()
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  // @Public()
  @Put(':id/category/:categoryId')
  addCategoryToProduct(
    @Param('id', ParseIntPipe) idProduct: number,
    @Param('categoryId', ParseIntPipe) idCategory: number,
  ) {
    return this.productsService.addCategoryToProduct(idProduct, idCategory);
  }

  // @Public()
  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
