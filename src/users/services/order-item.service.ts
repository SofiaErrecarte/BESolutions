import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne(data.orderId);
    const product = await this.productRepo.findOne(data.productId);
    const newOrderItem = new OrderItem();
    newOrderItem.order = order;
    newOrderItem.product = product;
    newOrderItem.quantity = data.quantity;
    return this.orderItemRepo.save(newOrderItem);
  }
  findAll() {
    return this.orderItemRepo.find({
      relations: ['order', 'order.customer'],
    });
  }

  findOne(id: number) {
    return this.orderItemRepo.findOne(id, {
      relations: ['order', 'product'],
    });
  }

  async update(id: number, changes: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepo.findOne(id);
    if (changes.orderId) {
      const order = await this.orderRepo.findOne(changes.orderId);
      orderItem.order = order;
    }
    if (changes.productId) {
      const product = await this.productRepo.findOne(changes.productId);
      orderItem.product = product;
    }
    if (changes.quantity) {
      orderItem.quantity = changes.quantity;
    }
    return this.orderItemRepo.save(orderItem);
  }

  delete(id: number) {
    return this.orderItemRepo.delete(id);
  }
}
