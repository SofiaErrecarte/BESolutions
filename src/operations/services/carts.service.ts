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

import { User } from 'src/users/entities/user.entity';
import { CartProduct } from '../entities/cartProduct.entity';
import { Product } from 'src/products/entities/product.entity';
import { Price } from 'src/products/entities/prices.entity';
import { State } from '../entities/state.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(User) private userRepo: Repository<User>,    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Price) private priceRepo: Repository<Price>,
    
    @InjectRepository(CartProduct)
    private cartProductRepo: Repository<CartProduct>,
  ) {}

  async findOne(id: number) {
    const cart = await this.cartRepo.findOne(id, {
      relations: ['user','cartProducts','supplier'],
    });
    if (!cart) {
      throw new NotFoundException(`Cart #${id} not found`);
    }
    return cart;
  }

  async findByUser(id: number) {
    const obj = await this.cartRepo.findOne({
      where: { user: id, state: true},
      relations: ['user', 'supplier', 'cartProducts'],
    });
    if (!obj) {
      return null;
    }
    return obj;
  }

  async findAll(params?: FilterOperationDto) {
    if (params) {
      const { limit, offset } = params;
      return await this.cartRepo.find({
        relations: ['user', 'cartProducts','supplier'],
        take: limit,
        skip: offset,
      });
    }
    return await this.cartRepo.find({
      relations: ['user', 'cartProducts','supplier'],
    });
  }

  async create(data: CreateCartDto) {
    const newObj = this.cartRepo.create(data);
    if (data.userId) {
      const obj = await this.userRepo.findOne(data.userId);
      newObj.user = obj;
    }
    return this.cartRepo.save(newObj);
  }

  async update(id: number, changes: UpdateCartDto) {
    const obj = await this.cartRepo.findOne({ where: { user: id }, relations: [],});
    if (!obj) {
      return null;
    }

    const product_cart = await this.cartProductRepo.find({
      where: { cart: changes.cartProductId },
      relations: ['cart', 'product'],
    });
    const product = await this.productRepo.find({where:{product:product_cart[0].product.id}})
    //  const price = await this.priceRepo.find({ where: { product: product[0].id } });
    const price = await this.priceRepo.findOne({ 
      where: {product : product[0].id},
      order: {fecha: "DESC"}
  });
     const subtotal = price.precio * product_cart[0].quantity *-1;

    changes.subtotal=subtotal;
    this.cartRepo.merge(obj, changes);
    return this.cartRepo.save(obj);
  }

  async remove(id: number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.cartRepo.delete(id);
  }
}
