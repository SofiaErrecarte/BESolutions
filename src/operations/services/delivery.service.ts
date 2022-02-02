import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository, Between, FindConditions } from 'typeorm'; //injectar Repository

import { Delivery } from './../entities/delivery.entity';
import { CreateDeliveryDto, UpdateDeliveryDto } from './../dtos/delivery.dtos';

import { Operation } from './../entities/operation.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Operation) private operationRepo: Repository<Operation>,
    @InjectRepository(Delivery) private deliveryRepo: Repository<Delivery>,
  ) {}

  async findOne(id: number) {
    const delivery = await this.deliveryRepo.findOne(id, {
      relations: ['operation'],
    });
    if (!delivery) {
      throw new NotFoundException(`Delivery #${id} not found`);
    }
    return delivery;
  }

  async create(data: CreateDeliveryDto) {
    const newObj = this.deliveryRepo.create(data);
    return this.operationRepo.save(newObj);
  }

  async update(id: number, changes: UpdateDeliveryDto) {
    const obj = await this.deliveryRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.deliveryRepo.merge(obj, changes);
    return this.operationRepo.save(obj);
  }

  async remove(id: number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.deliveryRepo.delete(id);
  }
}