//este decorador agrega la metadata a un decorador propio
//
import { SetMetadata } from '@nestjs/common';
//creamos una variable que va a ser visible
export const IS_PUBLIC_KEY = 'isPublic';
//creamos una funcion que por default dice que isPublic va a ser true
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
