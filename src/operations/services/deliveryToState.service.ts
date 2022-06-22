/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository
import {
  CreateDeliveryToStateDto,
  UpdateDeliveryToStateDto,
} from '../dtos/deliveryToState.dtos';
import { CreateStateDto, UpdateStateDto } from '../dtos/state.dtos';
import { Delivery } from '../entities/delivery.entity';
import { DeliveryToState } from '../entities/deliveryToState.entity';
import { State } from '../entities/state.entity';
@Injectable()
export class DeliveryToStateService {
  constructor(
    @InjectRepository(State) private stateRepo: Repository<State>,
    @InjectRepository(Delivery) private deliveryRepo: Repository<Delivery>,
    @InjectRepository(DeliveryToState)
    private delToStateRepo: Repository<DeliveryToState>,
  ) {}

  async findAll() {
    return await this.delToStateRepo.find({
      relations: ['delivery', 'state'],
    });
  }

  async findOne(id: number) {
    const deliveryToState = await this.delToStateRepo.findOne(id, {
      relations: ['delivery', 'state'], //cuando se busque un producto retornara con los objetos relacionados
    });
    if (!deliveryToState) {
      throw new NotFoundException(`DeliveryToState #${id} not found`);
    }
    return deliveryToState;
  }

  async create(data: CreateDeliveryToStateDto) {
    const newObj = this.delToStateRepo.create(data);
    // if (data.deliveryId) {
    //   const obj = await this.deliveryRepo.findOne(data.deliveryId);
    //   newObj.delivery = obj;
    // // }
    // if (data.stateId) {
    //   const listObj = await this.stateRepo.findOne(data.stateId);
    //   newObj.state = listObj;
    // }
    return this.delToStateRepo.save(newObj);
  }

  async update(id: number, changes: UpdateDeliveryToStateDto) {
    const obj = await this.delToStateRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    // if (changes.deliveryId) {
    //   const objRel = await this.deliveryRepo.findOne(changes.deliveryId);
    //   obj.delivery = objRel;
    // // }
    // if (changes.stateId) {
    //   const listObj = await this.stateRepo.findOne(changes.stateId);
    //   obj.state = listObj;
    // }
    this.delToStateRepo.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.delToStateRepo.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.delToStateRepo.delete(id); //elimina el registro con el id correspondiente
  }
}
