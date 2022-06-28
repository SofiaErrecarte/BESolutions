/* eslint-disable prettier/prettier */
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository, Between, FindConditions } from 'typeorm'; //injectar Repository

import { Cart } from '../entities/cart.entity';
import { CreateOperationProductDto, UpdateOperationProductDto, DeleteOperationProductDto, FilterOperationProductDto } from '../dtos/operationProduct.dtos';

import { Product } from 'src/products/entities/product.entity';
import { Price } from 'src/products/entities/prices.entity';
import { error } from 'console';
import { Operation } from '../entities/operation.entity';
import { OperationProduct } from '../entities/operationProduct.entity';
import { CartProduct } from '../entities/cartProduct.entity';

@Injectable()
export class OperationProductsService {
  constructor(
    @InjectRepository(Operation) private operationRepo: Repository<Operation>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Price) private priceRepo: Repository<Price>,
    @InjectRepository(OperationProduct)
    private operationProductRepo: Repository<OperationProduct>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartProduct)
    private cartProductRepo: Repository<CartProduct>,
  ) {}

  async findOne(id: number) {
    const cartProduct = await this.operationProductRepo.findOne(id, {
      relations: ['operation', 'product'],
    });
    if (!cartProduct) {
      throw new NotFoundException(`CartProduct #${id} not found`);
    }
    return cartProduct;
  }

  async findAllProducts(id: number) { // HAY QUE VER ESTO DEL PAID PARA REEMPLAZAR POR ESTADO
    const operation = await this.operationRepo.findOne({ where: { user: id, paid: false} });
    const obj = await this.operationProductRepo.find({
      where: { operation: operation.id },
      relations: ['product', 'operation'],
    });
    if (!obj) {
      return null;
    }
    return obj;
  }

  async findAll(params?: FilterOperationProductDto) {
    if (params) {
      const { limit, offset } = params;
      return await this.operationProductRepo.find({
        relations: ['operation', 'product'],
        take: limit,
        skip: offset,
      });
    }
    return await this.operationProductRepo.find({
      relations: ['operation', 'product'],
    });
  }

  async create(data: CreateOperationProductDto) {
    const operation = await this.operationRepo.findOne(data.operationId);
    const cart = await this.cartRepo.findOne(data.cartId, { relations: ['user','cartProducts','supplier']});
    
    //Creo cada operation product
    for (let index = 0; index < cart.cartProducts.length; index++) {
        let operationProduct = this.operationProductRepo.create(data);
        const element = cart.cartProducts[index];
        const cartProduct = await this.cartProductRepo.findOne(element.id, {relations: ['cart', 'product']});
        operationProduct.operation=operation;      
        operationProduct.product=cartProduct.product;
        operationProduct.quantity=cartProduct.quantity;
        this.operationProductRepo.save(operationProduct);
        this.cartProductRepo.delete(cartProduct); //elimino los cart products
    }
    //Vacío el carrito
    cart.subtotal=0;
    cart.supplier=null;
    this.cartRepo.save(cart);
  }
    
  

  async update(id: number, changes: UpdateOperationProductDto) {
    const obj = await this.operationProductRepo.findOne(id, {relations:['cart', 'product']});
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }

    this.operationProductRepo.merge(obj, changes);
    return this.operationProductRepo.save(obj);
  }

  async remove(id: number, data:DeleteOperationProductDto) {  
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.operationProductRepo.delete(id);
  }

}
