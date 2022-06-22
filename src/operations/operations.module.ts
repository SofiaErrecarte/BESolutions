/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1/3-Import entidad

import { Cart } from './entities/cart.entity';
import { Delivery } from './entities/delivery.entity';
import { Operation } from './entities/operation.entity';
import { State } from './entities/state.entity';
import { DeliveryToState } from './entities/deliveryToState.entity';
import { OperationToState } from './entities/operationToState.entity';
import { User } from 'src/users/entities/user.entity';
import { CartProduct } from './entities/cartProduct.entity';
import { CartProductsController } from './controllers/cartProducts.controller';
import { CartProductsService } from './services/cartProducts.service';
import { OperationsController } from './controllers/operations.controller';
import { CartsController } from './controllers/carts.controller';
import { DeliveryController } from './controllers/delivery.controller';
import { StateController } from './controllers/state.controller';
import { UsersController } from 'src/users/controllers/users.controller';

import { OperationsService } from './services/operations.service';
import { CartsService } from './services/carts.service';
import { DeliveriesService } from './services/delivery.service';
import { StateService } from './services/state.service';
import { ProductsModule } from 'src/products/products.module';
import { DeliveryToStateController } from './controllers/deliveryToState.controller';
import { OperationToStateController } from './controllers/operationToState.controller';
import { DeliveryToStateService } from './services/deliveryToState.service';
import { OperationToStateService } from './services/operationToState.service';
import { UsersService } from 'src/users/services/users.service';
import { PriceCities } from './entities/pricecities.entity';
import { PriceCitiesController } from './controllers/pricecities.controller';
import { PriceCitiesService } from './services/pricecities.service';

@Module({
  imports: [
    forwardRef(() => ProductsModule),
    TypeOrmModule.forFeature([
      Cart,
      Delivery,
      Operation,
      State,
      DeliveryToState,
      OperationToState,
      User,
      CartProduct,
      PriceCities,
    ]),
  ],
  controllers: [
    OperationsController,
    CartsController,
    DeliveryController,
    StateController,
    DeliveryToStateController,
    OperationToStateController,
    UsersController,
    CartProductsController,
    PriceCitiesController,
  ],
  providers: [
    OperationsService,
    DeliveriesService,
    CartsService,
    StateService,
    DeliveryToStateService,
    OperationToStateService,
    UsersService,
    CartProductsService,
    PriceCitiesService,
  ],
  exports: [TypeOrmModule],
})
export class OperationsModule {}
