/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { DeliveryToStateController } from './controllers/delivery-to-state.controller';
import { ProductsModule } from 'src/products/products.module';
import { Operation } from './entities/operation.entity';
import { State } from './entities/state.entity';
<<<<<<< HEAD
import { DeliveryToState } from './entities/deliveryToState.entity';
import { OperationToState } from './entities/operationToState.entity';

import { OperationsController } from './controllers/operations.controller';
import { CartsController } from './controllers/carts.controller';
import { DeliveryController } from './controllers/delivery.controller';
import { StateController } from './controllers/state.controller';

import { OperationsService } from './services/operations.service';
import { CartsService } from './services/carts.service';
import { DeliveriesService } from './services/delivery.service';
import { StateService } from './services/state.service';
import { ProductsModule } from 'src/products/products.module';
import { DeliveryToStateController } from './controllers/deliveryToState.controller';
import { OperationToStateController } from './controllers/operationToState.controller';
import { DeliveryToStateService } from './services/deliveryToState.service';
import { OperationToStateService } from './services/operationToState.service';
=======
import { Delivery } from './entities/delivery.entity';
import { Cart } from './entities/cart.entity';
import { DeliveryToState } from './entities/deliveryToState.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsService } from './services/carts.service';
import { DeliveriesService } from './services/delivery.service';
import { OperationsController } from './controllers/operations.controller';
import { CartController } from './controllers/cart.controller';
import { OperationsService } from './services/operations.service';
>>>>>>> sofi

@Module({
  imports: [
    forwardRef(() => ProductsModule),
    TypeOrmModule.forFeature([
      Cart,
      Delivery,
      Operation,
      State,
      DeliveryToState,
<<<<<<< HEAD
      OperationToState,
=======
>>>>>>> sofi
    ]),
  ],
  controllers: [
    OperationsController,
<<<<<<< HEAD
    CartsController,
    DeliveryController,
    StateController,
    DeliveryToStateController,
    OperationToStateController,
  ],
  providers: [
    OperationsService,
    DeliveriesService,
    CartsService,
    StateService,
    DeliveryToStateService,
    OperationToStateService,
  ],
  exports: [OperationsService, TypeOrmModule],
=======
    DeliveryToStateController,
    CartController,
  ],
  providers: [CartsService, DeliveriesService, OperationsService],
  exports: [TypeOrmModule],
>>>>>>> sofi
})
export class OperationsModule {}
