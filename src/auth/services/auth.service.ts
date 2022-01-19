import { Injectable } from '@nestjs/common';
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

  //valida el login
  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

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
