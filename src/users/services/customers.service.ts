import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository

@Injectable()
export class CustomersService {
  constructor(
    // @Inject('PG') private clientPg: Client,
    @InjectRepository(Customer) private repository: Repository<Customer>, //injectar Repository
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const obj = await this.repository.findOne(id);
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  create(data: CreateCustomerDto) {
    const newObj = this.repository.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea
    return this.repository.save(newObj);
  }

  async update(id: number, changes: UpdateCustomerDto) {
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
