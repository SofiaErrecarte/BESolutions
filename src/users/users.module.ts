import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1/3-Import entidad

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity'; // 2/3-Import entidad
import { ProductsModule } from 'src/products/products.module';
import { Cart } from 'src/operations/entities/cart.entity';
import { OperationsModule } from 'src/operations/operations.module';
import { CartsController } from 'src/operations/controllers/carts.controller';
import { CartsService } from 'src/operations/services/carts.service';
import { CartProductsController } from 'src/operations/controllers/cartProducts.controller';
import { CartProductsService } from 'src/operations/services/cartProducts.service';

// import { Playerdata } from './entities/playerdata.entity'; // 2/3-Import entidad
// import { PlayersdataService } from './services/playersdata.service';

@Module({
  imports: [forwardRef(() => ProductsModule), forwardRef(() => OperationsModule),TypeOrmModule.forFeature([User, Cart])], // 3/3-Import entidad
  controllers: [UsersController, CartsController, CartProductsController],
  providers: [UsersService, CartsService, CartProductsService],
  exports: [UsersService, TypeOrmModule], // dice que el servicio puede usarse en otro modulo
})
export class UsersModule {}
