/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { DeliveryToStateController } from './controllers/delivery-to-state.controller';
import { ProductsModule } from 'src/products/products.module';
import { Operation } from './entities/operation.entity';
import { State } from './entities/state.entity';
import { Delivery } from './entities/delivery.entity';
import { Cart } from './entities/cart.entity';
import { DeliveryToState } from './entities/deliveryToState.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsService } from './services/carts.service';
import { DeliveriesService } from './services/delivery.service';
import { OperationsController } from './controllers/operations.controller';
import { CartController } from './controllers/cart.controller';
import { OperationsService } from './services/operations.service';

@Module({
  imports: [
    forwardRef(() => ProductsModule),
    TypeOrmModule.forFeature([
      Cart,
      Delivery,
      Operation,
      State,
      DeliveryToState,
    ]),
  ],
  controllers: [
    OperationsController,
    DeliveryToStateController,
    CartController,
  ],
  providers: [CartsService, DeliveriesService, OperationsService],
  exports: [TypeOrmModule],
})
export class OperationsModule {}
