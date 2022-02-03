/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository, Between, FindConditions } from 'typeorm'; //injectar Repository

import { Cart } from '../entities/cart.entity';
import { CreateCartDto, UpdateCartDto } from '../dtos/cart.dtos';

import { Operation } from '../entities/operation.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findOne(id: number) {
    const cart = await this.cartRepo.findOne(id, {
      relations: ['operation', 'products'],
    });
    if (!cart) {
      throw new NotFoundException(`Cart #${id} not found`);
    }
    return cart;
  }

  async findAll() {
    return await this.cartRepo.find();
  }

  async create(data: CreateCartDto) {
    const newObj = this.cartRepo.create(data);
    if (data.productsIds) {
      const listObj = await this.productRepo.findByIds(data.productsIds); //repository con findByIds mando un array de id nos devuelve un array de objetos
      newObj.products = listObj;
    }
    return this.cartRepo.save(newObj);
  }

  async update(id: number, changes: UpdateCartDto) {
    const obj = await this.cartRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    if (changes.productsIds) {
      const listObj = await this.productRepo.findByIds(changes.productsIds);
      obj.products = listObj;
    }
    this.cartRepo.merge(obj, changes);
    return this.cartRepo.save(obj);
  }

  async remove(id: number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.cartRepo.delete(id);
  }

  async addProductToCart(cartId: number, productId: number) {
    const cart = await this.cartRepo.findOne(cartId, {
      relations: ['products'],
    });
    const product = await this.productRepo.findOne(productId);
    cart.products.push(product);
    return this.cartRepo.save(cart);
  }

  async removeCategoryByProduct(cartId: number, productId: number) {
    const cart = await this.cartRepo.findOne(cartId, {
      relations: ['products'],
    });
    cart.products = cart.products.filter((item) => {
      return item.id !== productId;
    });
  }
}
