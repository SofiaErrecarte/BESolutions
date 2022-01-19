import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';

import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>, //injectar Repository
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const obj = await this.repository.findOne(id, {
      relations: ['products'],
    });
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  create(data: CreateCategoryDto) {
    const newObj = this.repository.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea
    return this.repository.save(newObj);
  }

  async update(id: number, changes: UpdateCategoryDto) {
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
