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
import { State } from '../entities/state.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Operation) private operationRepo: Repository<Operation>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Delivery) private deliveryRepo: Repository<Delivery>, //injectar Repository
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(State) private stateRepo: Repository<State>,
    @InjectRepository(OperationToState)
    private opToStateRepo: Repository<OperationToState>,
  ) {}

  async findAll(params?: FilterOperationDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.operationRepo.find({
        relations: ['cart', 'delivery','cart.user','cart.supplier','state'],
        take: limit, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.operationRepo.find({
      relations: ['cart', 'delivery','cart.user','cart.supplier','state'], // para que cuando devuelva los objetos los devuelva con la relacion
    });
  }

  async findOne(id: number) {
    const operation = await this.operationRepo.findOne(id, {
      relations: ['delivery', 'cart','cart.user','cart.supplier','state'],
    });
    if (!operation) {
      throw new NotFoundException(`Operation #${id} not found`);
    }
    return operation;
  }

  async findBySupplier(supplier: number) {
    const supplierObj = await this.userRepo.findOne({ id: supplier });
    const cartObj = await this.cartRepo.find({ supplier: supplierObj });
    var objs = [];
    for (let index = 0; index < cartObj.length; index++) {
      const element = cartObj[index];
      const operationsArray = await this.operationRepo.find({ 
        where: {cart : element},
        relations: ['delivery', 'cart','cart.user','cart.supplier','state'],
      });
      // console.log(x[0]);
      objs.push(operationsArray[0]);
    }
    return objs;
  }

  async findByBuyer(buyer: number) {
    const buyerObj = await this.userRepo.findOne({ id: buyer });
    const cartObj = await this.cartRepo.find({ user: buyerObj });
    var objs = [];
    for (let index = 0; index < cartObj.length; index++) {
      const element = cartObj[index];
      const operationsArray = await this.operationRepo.find({ 
        where: {cart : element},
        relations: ['delivery', 'cart','cart.user','cart.supplier','state'],
      });
      // console.log(x[0]);
      objs.push(operationsArray[0]);
    }
    return objs;
  }

  async create(data: CreateOperationDto) {
    const newObj = this.operationRepo.create(data);
    if (data.deliveryId) {
      const obj = await this.deliveryRepo.findOne({
        where: {id:data.deliveryId},
        relations: ['operation','pricecities'],
      });
      newObj.delivery = obj;
      console.log(newObj.delivery);
    }
    if (data.cartId) {
      const obj = await this.cartRepo.findOne(data.cartId);
      newObj.cart = obj;
    }
    if (data.stateId) {
      const obj = await this.stateRepo.findOne(data.stateId);
      newObj.state = obj;
    }
    newObj.total = newObj.cart.subtotal + newObj.delivery.pricecities.price;
    return this.operationRepo.save(newObj);
  }

  async update(id: number, changes: UpdateOperationDto) {
    const obj = await this.operationRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    if (changes.deliveryId) {
      const objRel = await this.deliveryRepo.findOne({
        where: {id : changes.deliveryId},
        relations: ['operation','pricecities'],
      });
      obj.delivery = objRel;
    }
    if (changes.cartId) { 
      const objRel = await this.cartRepo.findOne(changes.cartId);
      obj.cart = objRel;
    }
    if (changes.stateId) {
      const objRel = await this.stateRepo.findOne(changes.stateId);
      obj.state = objRel;
    }
    if (changes.cartId || changes.deliveryId ) { 
      obj.total = obj.cart.subtotal + obj.delivery.pricecities.price;
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
