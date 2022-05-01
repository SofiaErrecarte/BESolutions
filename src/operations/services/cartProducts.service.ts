/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository, Between, FindConditions } from 'typeorm'; //injectar Repository

import { Cart } from '../entities/cart.entity';
import {
  CreateCartProductDto,
  FilterOperationDto,
  UpdateCartProductDto,
} from '../dtos/cartProduct.dtos';

import { Product } from 'src/products/entities/product.entity';
import { CartProduct } from '../entities/cartProduct.entity';

@Injectable()
export class CartProductsService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(CartProduct)
    private cartProductRepo: Repository<CartProduct>,
  ) {}

  async findOne(id: number) {
    const cartProduct = await this.cartProductRepo.findOne(id, {
      relations: ['cart', 'product'],
    });
    if (!cartProduct) {
      throw new NotFoundException(`CartProduct #${id} not found`);
    }
    return cartProduct;
  }

  async findAll(params?: FilterOperationDto) {
    if (params) {
      const { limit, offset } = params;
      return await this.cartProductRepo.find({
        relations: ['cart', 'product'],
        take: limit,
        skip: offset,
      });
    }
    return await this.cartProductRepo.find({
      relations: ['cart', 'product'],
    });
  }

  async create(data: CreateCartProductDto) {
    const newObj = this.cartProductRepo.create(data);
    if (data.productId) {
      const obj = await this.productRepo.findOne(data.productId);
      newObj.product = obj;
    }
    if (data.cartId) {
      const obj = await this.cartRepo.findOne(data.cartId);
      newObj.cart = obj;
    }
    return this.cartProductRepo.save(newObj);
  }

  async update(id: number, changes: UpdateCartProductDto) {
    const obj = await this.cartProductRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    } //no deberia poder editarse ni el cart id ni el product id. en cualquier caso se elimina el registro de cart_product. solo puede modificarse quantity
    this.cartProductRepo.merge(obj, changes);
    return this.cartProductRepo.save(obj);
  }

  async remove(id: number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.cartProductRepo.delete(id);
  }

  // async addProductToCart(cartId: number, productId: number) {
  //   const cart = await this.cartProductRepo.findOne(cartId, {
  //     relations: ['user', 'products'],
  //   });
  //   const product = await this.productRepo.findOne(productId);
  //   cart.products.push(product);
  //   return this.cartProductRepo.save(cart);
  // }

  // //chequear este metodo
  // async removeProductByCart(cartId: number, productId: number) {
  //   const cart = await this.cartProductRepo.findOne(cartId, {
  //     relations: ['user', 'products'],
  //   });
  //   cart.products = cart.products.filter((item) => {
  //     return item.id !== productId;
  //   });
  // }
}
