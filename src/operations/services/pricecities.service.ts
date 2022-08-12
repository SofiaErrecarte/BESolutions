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
    const obj = this.pricecitiesRepo.findOne(id);
    if (!obj) {
      throw new NotFoundException(`PriceCities #${id} not found`);
    }
    return obj;
  }

  async finByCP(cpO: string, cpD:string) {
    
    const obj = await this.pricecitiesRepo.findOne({
      where: {cp_origen:cpO,cp_destino:cpD}}
    );
    console.log(obj);
    if (!obj) {
      const obj2 = this.pricecitiesRepo.findOne({
        where: {id:1}}
      );
      return obj2;
    }
    return obj;
  }

  create(data: CreatePriceCitiesDto) {
    const newObj = this.pricecitiesRepo.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea
    const newObj2 = new PriceCities();
    newObj2.cp_origen = data.cp_destino;
    newObj2.cp_destino = data.cp_origen;
    newObj2.origen = data.destino;
    newObj2.destino = data.origen;
    newObj2.price = data.price;
    newObj2.days = data.days;
    this.pricecitiesRepo.save(newObj2);
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
