import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// import { TypeOrmModule } from '@nestjs/typeorm';
// import config from './config';

// de esta forma importo el servicio para usar los metodos
import { UsersService } from './../../users/services/users.service';
import { User } from './../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

import { PayloadToken } from './../models/token.models';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // valida el login
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const active = await this.usersService.isActive(user.id);
      console.log(active);
      if(!active){
        throw new UnauthorizedException('No activo.');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  // async validateUser(email: string, password: string) {
  //   const user = await this.usersService.findByEmail(email);
  //   if (user) {
  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (isMatch) {
  //       const { password, ...rta } = user;
  //       return rta;
  //     }
  //   }
  //   return null;
  // }

  //cae en este metodo despues de que el usuario se logio
  generateJWT(user: User) {
    //PayloadToken esta tipado y es una interface creada en models
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
