import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from './../services/auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super(); //al estar heredando (extends) es necesario decirle que llamas al constructor del objeto que estas heredando
    // si quisiera cambiar el naming de como me debe enviar en el json del request puedo cambiarlo aca
    // super({
    //   usernameField: 'email',
    //   passwordField: 'password',
    // });
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('not allow');
    }
    return user;
  }
}
