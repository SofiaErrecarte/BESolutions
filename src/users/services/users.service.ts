/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  Inject,
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

// import { ProductsService } from './../../products/services/products.service';
import { CustomersService } from './customers.service';
import { CountriesService } from '../../settings/services/countries.service';

@Injectable()
export class UsersService {
  constructor(
    // @Inject('PG') private clientPg: Client,
    // private configService: ConfigService,
    @InjectRepository(User) private repoUser: Repository<User>, //injectar Repository
    private customersService: CustomersService,
    private countriesService: CountriesService,
  ) {}

  async findAll(params?: FilterUserDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.repoUser.find({
        relations: ['customer', 'country'],
        take: limit, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.repoUser.find({
      relations: ['customer', 'country'], // para que cuando devuelva los objetos los devuelva con la relacion
    });
  }

  async findOne(id: number) {
    const obj = await this.repoUser.findOne(id);
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  async findByUsername(username: string) {
    const obj = await this.repoUser.findOne({ username: username });
    if (!obj) {
      //throw new NotFoundException(`Object #${email} not found`);
      return null;
    }
    return obj;
  }

  async create(data: CreateUserDto) {
    const usernameUser = await this.findByUsername(data.username);
    if (usernameUser) {
      throw new HttpException(
        {
          message: `The username ${data.username} already exists.`,
          status: HttpStatus.CONFLICT,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newObj = this.repoUser.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea
    const hashPassword = await bcrypt.hash(newObj.password, 10); // creo el hash del pass
    newObj.password = hashPassword; // cambio la pass del usuario por su hash
    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      newObj.customer = customer;
    }
    if (data.countryId) {
      const country = await this.countriesService.findOne(data.countryId);
      newObj.country = country;
    }
    //console.log(newObj);
    return this.repoUser.save(newObj);
  }

  async update(id: number, changes: UpdateUserDto) {
    const obj = await this.repoUser.findOne(id);
    const hashPassword = await bcrypt.hash(obj.password, 10); // creo el hash del pass
    obj.password = hashPassword;
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    if (changes.customerId) {
      const customer = await this.customersService.findOne(changes.customerId);
      obj.customer = customer;
    }
    if (changes.countryId) {
      const country = await this.countriesService.findOne(changes.countryId);
      obj.country = country;
    }
    this.repoUser.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.repoUser.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.repoUser.delete(id); //elimina el registro con el id correspondiente
  }

  // async getOrderByUser(id: number) {
  //   const user = await this.findOne(id);
  //   return {
  //     date: new Date(),
  //     user,
  //     products: this.productsService.findAll(),
  //   };
  // }
}
