import { Injectable, NotFoundException } from '@nestjs/common';

import { Price } from '../entities/prices.entity';
import {
  CreatePriceDto,
  FilterPriceDto,
  UpdatePriceDto,
} from '../dtos/prices.dto';

import { InjectRepository } from '@nestjs/typeorm'; //injectar repoPrice
import { Repository } from 'typeorm'; //injectar repoPrice
import { Product } from '../entities/product.entity';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Price) private repoPrice: Repository<Price>, //injectar repoPrice
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll(params?: FilterPriceDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.repoPrice.find({
        relations: ['product'],
        take: limit, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.repoPrice.find({
      relations: ['product'], // para que cuando devuelva los objetos los devuelva con la relacion
    });
  }

  async findOne(id: number) {
    const obj = await this.repoPrice.findOne(id, {
      relations: ['product'],
    });
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  async create(data: CreatePriceDto) {
    const newObj = this.repoPrice.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea
    if (data.product) {
      const obj = await this.productRepo.findOne(data.product);
      newObj.product = obj;
    }
    return this.repoPrice.save(newObj);
  }

  async update(id: number, changes: UpdatePriceDto) {
    const obj = await this.repoPrice.findOne(id);
    if (changes.product) {
      const objReal = await this.productRepo.findOne(changes.product);
      obj.product = objReal;
    }
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.repoPrice.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.repoPrice.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.repoPrice.delete(id); //elimina el registro con el id correspondiente
  }
}
