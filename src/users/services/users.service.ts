/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository

import { CreateUserDto, UpdateUserDto, FilterUserDto } from '../dtos/user.dto';
import { Cart } from 'src/operations/entities/cart.entity';

// import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    // @Inject('PG') private clientPg: Client,
    // private configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>, //injectar Repository
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
  ) {}

  async findAll(params?: FilterUserDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.userRepo.find({
        relations: ['products', 'cart'],
        take: limit, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.userRepo.find({
      relations: ['products', 'cart'], // para que cuando devuelva los objetos los devuelva con la relacion
    });
  }

  async findOne(id: number) {
    const obj = await this.userRepo.findOne(id, {
      relations: ['products', 'cart'], //cuando se busque un producto retornara con los objetos relacionados
    });
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async findByUsername(username: string) {
    const obj = await this.userRepo.findOne({ username: username });
    if (!obj) {
      //throw new NotFoundException(`Object #${email} not found`);
      return null;
    }
    return obj;
  }

  async findByCuitCuil(cuitcuil: string) {
    const obj = await this.userRepo.findOne({ cuitcuil: cuitcuil });
    if (!obj) {
      return null;
    }
    return obj;
  }

  async create(data: CreateUserDto) {
    const usernameUser = await this.findByUsername(data.username);
    const cuitcuilUser = await this.findByCuitCuil(data.cuitcuil);
    if (usernameUser) {
      throw new HttpException(
        {
          message: `The username ${data.username} already exists.`,
          status: HttpStatus.CONFLICT,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (cuitcuilUser) {
      throw new HttpException(
        {
          message: `The cuit - cuil  ${data.cuitcuil} already exists.`,
          status: HttpStatus.CONFLICT,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newObj = this.userRepo.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea
    const hashPassword = await bcrypt.hash(newObj.password, 10); // creo el hash del pass
    newObj.password = hashPassword; // cambio la pass del usuario por su hash
    this.userRepo.save(newObj);
    const cart = new Cart();
    cart.subtotal=0;
    cart.user=newObj;
    this.cartRepo.save(cart);
    //return this.userRepo.merge(newObj, cart);
    //return this.userRepo.save(newObj);
    const newUser = await this.findByUsername(data.username);
    return this.userRepo.merge(newObj,data);    
  }

  async update(id: number, changes: UpdateUserDto) {
    const obj = await this.userRepo.findOne(id);
    const hashPassword = await bcrypt.hash(obj.password, 10); // creo el hash del pass
    obj.password = hashPassword;
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.userRepo.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.userRepo.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.userRepo.delete(id); //elimina el registro con el id correspondiente
  }
}
