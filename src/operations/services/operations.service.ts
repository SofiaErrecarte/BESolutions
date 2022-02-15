/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository
import { Operation } from './../entities/operation.entity';
import {
  CreateOperationDto,
  FilterOperationDto,
  UpdateOperationDto,
} from '../dtos/operation.dtos';

import { Delivery } from './../entities/delivery.entity';
import { Cart } from './../entities/cart.entity';
import { OperationToState } from '../entities/operationToState.entity';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Operation) private operationRepo: Repository<Operation>,
    @InjectRepository(Delivery) private deliveryRepo: Repository<Delivery>, //injectar Repository
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(OperationToState)
    private opToStateRepo: Repository<OperationToState>,
  ) {}

  async findAll(params?: FilterOperationDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.operationRepo.find({
        relations: ['cart', 'delivery', 'operationToStates'],
        take: limit, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.operationRepo.find({
      relations: ['cart', 'delivery', 'operationToStates'], // para que cuando devuelva los objetos los devuelva con la relacion
    });
  }

  async findOne(id: number) {
    const operation = await this.operationRepo.findOne(id, {
      relations: ['delivery', 'cart', 'operationToStates'],
    });
    if (!operation) {
      throw new NotFoundException(`Operation #${id} not found`);
    }
    return operation;
  }

  async create(data: CreateOperationDto) {
    const newObj = this.operationRepo.create(data);
    if (data.deliveryId) {
      const obj = await this.deliveryRepo.findOne(data.deliveryId);
      newObj.delivery = obj;
    }
    if (data.cartId) {
      const obj = await this.cartRepo.findOne(data.cartId);
      newObj.cart = obj;
    }
    return this.operationRepo.save(newObj);
  }

  async update(id: number, changes: UpdateOperationDto) {
    const obj = await this.operationRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    if (changes.deliveryId) {
      const objRel = await this.deliveryRepo.findOne(changes.deliveryId);
      obj.delivery = objRel;
    }
    if (changes.cartId) {
      const objRel = await this.cartRepo.findOne(changes.cartId);
      obj.cart = objRel;
    }
    this.operationRepo.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.operationRepo.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.operationRepo.delete(id); //elimina el registro con el id correspondiente
  }
}
