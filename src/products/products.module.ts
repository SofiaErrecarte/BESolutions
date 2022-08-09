/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1/3-Import entidad

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity'; // 2/3-Import entidad

import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity'; // 2/3-Import entidad
import { PricesController } from './controllers/prices.controller';
import { PricesService } from './services/prices.service';
import { Price } from './entities/prices.entity';
import { UsersModule } from 'src/users/users.module';
import { OperationsModule } from 'src/operations/operations.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [forwardRef(() => UsersModule),
    forwardRef(() => OperationsModule), 
    TypeOrmModule.forFeature([Product, Category, Price]), 
    MulterModule.register({ dest:'./uploads'})],
  controllers: [ProductsController, CategoriesController, PricesController],
  providers: [ProductsService, CategoriesService, PricesService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
