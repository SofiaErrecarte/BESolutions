import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

import { Reflector } from '@nestjs/core'; //

import { ConfigType } from '@nestjs/config'; //inyectar las variables .env
import config from '../../config'; //inyectar las variables .env

import { IS_PUBLIC_KEY } from './../decorators/public.decorator'; // importamos el decorador

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>, //inyectar las variables .env
    private reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // con esta metadata le decimos que si una ruta tiene un decorador @SetMetadata('isPublic', true)
    // va a dejarlo entrar sin necesidad de tener header o token o lo que sea
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Auth');
    const isAuth = authHeader === this.configService.apiKey; //hacer uso de las variables .env
    if (!isAuth) {
      throw new UnauthorizedException('not allow');
    }
    return true;
  }
}
