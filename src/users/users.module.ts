import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1/3-Import entidad

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer } from './entities/customer.entity'; // 2/3-Import entidad

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity'; // 2/3-Import entidad

import { Order } from './entities/order.entity'; // 2/3-Import entidad
import { OrderItem } from './entities/order-item.entity'; // 2/3-Import entidad

import { ProductsModule } from '../products/products.module';
import { SettingsModule } from '../settings/settings.module';
import { OrdersService } from './services/orders.service';
import { OrderItemService } from './services/order-item.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemController } from './controllers/order-item.controller';

import { Playerdata } from './entities/playerdata.entity'; // 2/3-Import entidad
import { PlayersdataService } from './services/playersdata.service';
import { PlayersdataController } from './controllers/playersdata.controller';

// import { Playerdata } from './entities/playerdata.entity'; // 2/3-Import entidad
// import { PlayersdataService } from './services/playersdata.service';

@Module({
  imports: [
    ProductsModule,
    SettingsModule,
    TypeOrmModule.forFeature([User, Playerdata, Customer, Order, OrderItem]),
  ], // 3/3-Import entidad typeorm
  controllers: [
    CustomerController,
    UsersController,
    OrdersController,
    OrderItemController,
    PlayersdataController,
  ],
  providers: [
    CustomersService,
    UsersService,
    OrdersService,
    OrderItemService,
    PlayersdataService,
  ],
  exports: [UsersService, PlayersdataService], // dice que el servicio puede usarse en otro modulo
})
export class UsersModule {}
