import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from './../entities/customers.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './../dtos/customers.dto';
import { ProductsService } from './../../products/services/products.service';
@Injectable()
export class CustomersService {
  constructor(private productsService: ProductsService) {}
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Customer 1',
      age: '23',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const Customer = this.customers.find((item) => item.id === id);
    if (!Customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return Customer;
  }

  create(payload: CreateCustomerDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(new Customer());
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const Customer = this.findOne(id);
    const index = this.customers.findIndex((item) => item.id === id);
    this.customers[index] = {
      ...Customer,
      ...payload,
    };
    return this.customers[index];
  }

  remove(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  }
}
