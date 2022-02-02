/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1/3-Import entidad
import { UsersModule } from 'src/users/users.module';

import { Cart } from './entities/cart.entity';
import { Delivery } from './entities/delivery.entity';
import { Operation } from './entities/operation.entity';
import { State } from './entities/state.entity';

import { OperationsController } from './controllers/operations.controller';
import { CartsController } from './controllers/carts.controller';
import { DeliveryController } from './controllers/delivery.controller';
import { StateController } from './controllers/state.controller';

import { OperationsService } from './services/operations.service';
import { CartsService } from './services/carts.service';
import { DeliveriesService } from './services/delivery.service';
import { StateService } from './services/state.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [forwardRef(()=>ProductsModule),TypeOrmModule.forFeature([Cart, Delivery, Operation, State])],
  controllers: [OperationsController, CartsController, DeliveryController, StateController],
  providers: [OperationsService, DeliveriesService, CartsService, StateService],
  exports: [OperationsService, TypeOrmModule],
})
export class OperationsModule {}
