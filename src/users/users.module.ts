import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1/3-Import entidad

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity'; // 2/3-Import entidad
import { ProductsModule } from 'src/products/products.module';

// import { Playerdata } from './entities/playerdata.entity'; // 2/3-Import entidad
// import { PlayersdataService } from './services/playersdata.service';

@Module({
  imports: [forwardRef(() => ProductsModule), TypeOrmModule.forFeature([User])], // 3/3-Import entidad
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule], // dice que el servicio puede usarse en otro modulo
})
export class UsersModule {}
