/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository, Between, FindConditions } from 'typeorm'; //injectar Repository

import { Cart } from '../entities/cart.entity';
import {
  CreateCartProductDto,
  DeleteCartProductDto,
  FilterCartProductDto,
  UpdateCartProductDto,
} from '../dtos/cartProduct.dtos';

import { Product } from 'src/products/entities/product.entity';
import { CartProduct } from '../entities/cartProduct.entity';
import { Price } from 'src/products/entities/prices.entity';

@Injectable()
export class CartProductsService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Price) private priceRepo: Repository<Price>,
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

  
  // async findAllProducts(id: number) {
  //   return await this.cartProductRepo.find({ cart_id: id });
  // }

  // async findAllProducts(id: number) {
  //   return await this.cartProductRepo.find({
  //     relations: ['cart', 'product'],
  //     where: { cart_id: id },
  //   });
  // }

  async findAllProducts(id: number) {
    const cart2 = await this.cartRepo.find({ where: { user: id } });
   // console.log(cart2);
    const obj = await this.cartProductRepo.find({
      where: { cart: cart2[0].id },
      relations: ['cart', 'product'],
    });
    if (!obj) {
      return null;
    }
    return obj;
  }

  async findAll(params?: FilterCartProductDto) {
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
    const product = await this.productRepo.findOne(data.productId);
    const cart = await this.cartRepo.find({ where: { user: data.userId } });
    const price = await this.priceRepo.find({ where: { product: product.id } });
    

    const subtotal = price[0].precio * data.quantity; //VER acá precio en 0

    cart[0].subtotal=cart[0].subtotal+subtotal;
    await this.cartRepo.save(cart[0]);


    if (data.productId) {
      const obj = await this.productRepo.findOne(data.productId);
      newObj.product = obj;
    }
    if (data.cartId) {
      const obj = await this.cartRepo.findOne(data.cartId);
      newObj.cart = obj;
    }
    if (data.userId) {
      const obj = await this.cartRepo.findOne({ where: { user: data.userId } });
      newObj.cart = obj;
    }
    return this.cartProductRepo.save(newObj);
  }

  async update(id: number, changes: UpdateCartProductDto) {
    const obj = await this.cartProductRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.cartProductRepo.merge(obj, changes);
    return this.cartProductRepo.save(obj);
  }

  async remove(id: number, data:DeleteCartProductDto) {  
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    console.log(data);
    // const cart_product = await this.findOne(id);
    //  const cart = await this.cartRepo.find({ where: { user: data.userId } });
    //  const product = await this.productRepo.findOne(data.productId);
    //  const price = await this.priceRepo.find({ where: { product: product.id } });
    //  console.log("cart: ",cart[0]);
    //  const subtotal = price[0].precio * cart_product.quantity *-1; //VER acá precio en 0  
    //  cart[0].subtotal=cart[0].subtotal+subtotal;
    //  console.log("Subtotal: ",subtotal);
    // await this.cartRepo.save(cart[0]);
    // // await this.cartRepo.merge(cart[0], subtotal);
    return this.cartProductRepo.delete(id);
  }

}
