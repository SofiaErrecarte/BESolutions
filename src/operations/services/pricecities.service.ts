/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository
import { CreatePriceCitiesDto, UpdatePriceCitiesDto } from '../dtos/pricecities.dtos';
import { PriceCities } from '../entities/pricecities.entity';
@Injectable()
export class PriceCitiesService {
  constructor(
    @InjectRepository(PriceCities) private pricecitiesRepo: Repository<PriceCities>, //injectar Repository
  ) {}

  async findAll() {
    return await this.pricecitiesRepo.find();
  }

  async findOne(id: number) {
    const obj = this.pricecitiesRepo.findOne();
    if (!obj) {
      throw new NotFoundException(`PriceCities #${id} not found`);
    }
    return obj;
  }

  create(data: CreatePriceCitiesDto) {
    const newObj = this.pricecitiesRepo.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea
    return this.pricecitiesRepo.save(newObj);
  }

  async update(id: number, changes: UpdatePriceCitiesDto) {
    const obj = await this.pricecitiesRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.pricecitiesRepo.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.pricecitiesRepo.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.pricecitiesRepo.delete(id);
  }
}
