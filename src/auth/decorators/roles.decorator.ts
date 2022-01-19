//este decorador agrega la metadata a un decorador propio
//
import { SetMetadata } from '@nestjs/common';
//creamos una variable que va a ser visible
import { Role } from '../models/roles.model';
export const ROLES_KEY = 'roles';
//creamos una funcion que por default dice que roles va a ser true
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY,true);
