import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/user.service';
import { ProductsModule } from '../products/products.module';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController],
  providers: [UserService, CustomersService],
})
export class UsersModule {}
