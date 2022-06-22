/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository, Between, FindConditions } from 'typeorm'; //injectar Repository

import { Delivery } from './../entities/delivery.entity';
import { CreateDeliveryDto, UpdateDeliveryDto } from './../dtos/delivery.dtos';

import { Operation } from './../entities/operation.entity';
import { PriceCities } from '../entities/pricecities.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Operation) private operationRepo: Repository<Operation>,
    @InjectRepository(Delivery) private deliveryRepo: Repository<Delivery>,
    @InjectRepository(PriceCities) private priceRepo: Repository<PriceCities>,

  ) {}

  async findOne(id: number) {
    const delivery = await this.deliveryRepo.findOne(id, {
      relations: ['operation','pricecities'],
    });
    if (!delivery) {
      throw new NotFoundException(`Delivery #${id} not found`);
    }
    return delivery;
  }

  async findAll() {
    return await this.deliveryRepo.find({
      relations: ['operation','pricecities'],
    });
  }

  async create(data: CreateDeliveryDto) {
    const newObj = this.deliveryRepo.create(data);
    if (data.priceId) {
      const obj = await this.priceRepo.findOne(data.priceId);
      newObj.pricecities = obj;
    }
    return this.deliveryRepo.save(newObj);
  }

  async update(id: number, changes: UpdateDeliveryDto) {
    const obj = await this.deliveryRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    if (changes.operationId) {
      const objRel = await this.operationRepo.findOne(changes.operationId);
      obj.operation = objRel;
    }
    if (changes.priceId) {
      const objRel = await this.priceRepo.findOne(changes.priceId);
      obj.pricecities = objRel;
    }
    this.deliveryRepo.merge(obj, changes);
    return this.deliveryRepo.save(obj);
  }

  async remove(id: number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.deliveryRepo.delete(id);
  }
}
