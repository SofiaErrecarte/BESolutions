import { Injectable, NotFoundException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Client } from 'pg';

import { Brand } from '../entities/brand.entity';

import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository

import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

// import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private repository: Repository<Brand>, //injectar Repository
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const obj = await this.repository.findOne({
      relations: ['brand'],
      where: {
        id,
      },
    });
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  create(data: CreateBrandDto) {
    const newObj = this.repository.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea
    return this.repository.save(newObj);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const obj = await this.repository.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.repository.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.repository.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.repository.delete(id); //elimina el registro con el id correspondiente
  }
}
