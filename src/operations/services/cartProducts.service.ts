/* eslint-disable prettier/prettier */
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
import { count, error } from 'console';

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
    let newObj = this.cartProductRepo.create(data);
    const product = await this.productRepo.findOne(data.productId, {relations:['user']});
    const cart = await this.cartRepo.find({ 
      where: { user: data.userId },
      relations: ['user','cartProducts', 'supplier', 'cartProducts.product'],
    });

    //UPDATE PRODUCT STOCK
    product.stock=product.stock-data.quantity;
    
    // ADD SUPPLIER
    if(cart[0].cartProducts.length == 0){
      cart[0].supplier=product.user;
    }
    await this.cartRepo.save(cart[0]);

    // CHECK SUPPLIER
    if(product.user.id==cart[0].supplier.id){
        // const price = await this.priceRepo.findOne({ where: { product: product.id }, order: {fecha: "DESC"} });
        
      // const subtotal = price.precio * data.quantity; 
      // cart[0].subtotal=cart[0].subtotal+subtotal;
          if (data.productId) {
            const obj = await this.productRepo.findOne(data.productId);
            newObj.product = obj;
          }
          if (data.userId) {
            const obj = await this.cartRepo.findOne({ where: { user: data.userId } });
            newObj.cart = obj;
          }
          // CHECK EXISTENCE
          for (let index = 0; index < cart[0].cartProducts.length; index++) {
            const element = cart[0].cartProducts[index].product;
            if(element.id===product.id){
              const new_quantity=cart[0].cartProducts[index].quantity+data.quantity;
              cart[0].cartProducts[index].quantity=new_quantity;
              newObj=cart[0].cartProducts[index];
              break;
            }
          }
          await this.productRepo.save(product);
          await this.cartRepo.save(cart[0]);
          return this.cartProductRepo.save(newObj);          
    }else{
      throw new NotFoundException(`No es posible agregar productos de distintos proveedores.`);      
    }
    
  }

  async update(id: number, changes: UpdateCartProductDto) {
    const obj = await this.cartProductRepo.findOne(id, {relations:['cart', 'product']});
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    const product = await this.productRepo.findOne(obj.product.id, {relations:['user', 'prices']});
    const cart = await this.cartRepo.findOne(obj.cart.id, {relations: ['user', 'cartProducts', 'supplier', 'cartProducts.product'],
    });

  //   const price = await this.priceRepo.findOne({ 
  //     where: {product : product.id},
  //     order: {fecha: "DESC"}
  // });
    
    // const subtotal = (changes.quantity-obj.quantity)*price.precio;
    // cart.subtotal=cart.subtotal+subtotal;
    await this.cartRepo.save(cart);

    const stock = (obj.quantity-changes.quantity);
    product.stock = product.stock+stock;
    await this.productRepo.save(product);

    this.cartProductRepo.merge(obj, changes);
    return this.cartProductRepo.save(obj);
  }

  async remove(id: number, data:DeleteCartProductDto) {  
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    
    const cart_product = await this.cartProductRepo.findOne(id, {relations:['cart', 'cart.cartProducts', 'product', 'product.prices']});
    const price = await this.priceRepo.findOne({ 
      where: {product : cart_product.product.id},
      order: {id: "DESC"}
  });

  //update product stock
    cart_product.product.stock=cart_product.product.stock+cart_product.quantity;
    await this.productRepo.save(cart_product.product);

    // const subtotal = price.precio * cart_product.quantity *-1;
    // cart_product.cart.subtotal=cart_product.cart.subtotal+subtotal;
    await this.cartRepo.save(cart_product.cart);
    
   
    // if(cart_product.cart.cartProducts.length=1){
    //   cart_product.cart.subtotal=0;
    //   cart_product.cart.supplier=null;
    //   }
      
    //   await this.cartRepo.save(cart_product.cart);
     await this.cartProductRepo.delete(id);
  }

}
