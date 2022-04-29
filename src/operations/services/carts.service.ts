/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository, Between, FindConditions } from 'typeorm'; //injectar Repository

import { Cart } from '../entities/cart.entity';
import {
  CreateCartDto,
  FilterOperationDto,
  UpdateCartDto,
} from '../dtos/cart.dtos';

import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async findOne(id: number) {
    const cart = await this.cartRepo.findOne(id, {
      relations: ['user', 'operation', 'products'],
    });
    if (!cart) {
      throw new NotFoundException(`Cart #${id} not found`);
    }
    return cart;
  }

  // async findAll() {
  //   return await this.cartRepo.find({
  //     relations: ['operation', 'products'],
  //   });
  // }

  async findAll(params?: FilterOperationDto) {
    if (params) {
      const { limit, offset } = params;
      return await this.cartRepo.find({
        relations: ['user', 'operation', 'products'],
        take: limit,
        skip: offset,
      });
    }
    return await this.cartRepo.find({
      relations: ['user', 'operation', 'products'],
    });
  }

  async create(data: CreateCartDto) {
    const newObj = this.cartRepo.create(data);
    if (data.productsIds) {
      const listObj = await this.productRepo.findByIds(data.productsIds); //repository con findByIds mando un array de id nos devuelve un array de objetos
      newObj.products = listObj;
    }
    if (data.userId) {
      const obj = await this.userRepo.findOne(data.userId);
      newObj.user = obj;
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
    // if (changes.userId) {
    //   const objRel = await this.userRepo.findOne(changes.userId);
    //   obj.user = objRel;
    // } no debería poder editarse el user de un carrito
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
      relations: ['user', 'products'],
    });
    const product = await this.productRepo.findOne(productId);
    cart.products.push(product);
    return this.cartRepo.save(cart);
  }

  //chequear este metodo
  async removeProductByCart(cartId: number, productId: number) {
    const cart = await this.cartRepo.findOne(cartId, {
      relations: ['user', 'products'],
    });
    cart.products = cart.products.filter((item) => {
      return item.id !== productId;
    });
  }
}
