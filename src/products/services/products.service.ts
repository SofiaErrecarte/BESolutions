/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { ChangeStream, Repository } from 'typeorm'; //injectar Repository

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
  ExistsProductDto
} from './../dtos/products.dtos';

// import { BrandsService } from './../services/brands.service';
import { Category } from './../entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Cart } from 'src/operations/entities/cart.entity';
import { CartProduct } from 'src/operations/entities/cartProduct.entity';
import { Price } from '../entities/prices.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Price) private priceRepo: Repository<Price>,
    @InjectRepository(CartProduct) private cartProductRepo: Repository<CartProduct>,
  ) {}

  async findAll(params?: FilterProductDto) {
    if (params) {
      const { category, seller, value, limit, offset } = params; // funcion de desconstruccion
      if (value){
        return await this.productRepo.query(`select * from products where name like '%${value}%'`);
      }
      if (seller){
        return await this.productRepo.find({
        where: { user: seller },
        relations: ['category','prices', 'cartProducts'],
        take: limit, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
      }
      if (category){
        return await this.productRepo.find({
        where: { category: category },
        relations: ['prices', 'user', 'cartProducts'],
        take: limit, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
      }
      return await this.productRepo.find({
        relations: ['category','prices', 'user', 'cartProducts'],
        take: limit, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.productRepo.find({
      relations: ['category','prices', 'user', 'cartProducts'], // para que cuando devuelva los objetos los devuelva con la relacion
    });
  }

  async findBySeller(id: number) {
    const seller = await this.userRepo.findOne(id);
      return await this.productRepo.find({
        where: { user: seller },
        relations: ['category','prices', 'user', 'cartProducts'],

      });
    
    return await this.productRepo.find({
      relations: ['prices', 'user', 'cartProducts'], // para que cuando devuelva los objetos los devuelva con la relacion
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['category','prices', 'user', 'cartProducts'], //cuando se busque un producto retornara con los objetos relacionados
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`); 
    }
    return product;
  } 

  async create(data: CreateProductDto) {
    const newObj = this.productRepo.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea
    if (data.category_id) {
      const obj = await this.categoryRepo.findOne(data.category_id);
      newObj.category = obj;
    }
    if (data.user_id) {
      const obj = await this.userRepo.findOne(data.user_id);
      newObj.user = obj;
    }
    const product = await this.productRepo.save(newObj); 
    console.log(product);
    const priceObj = this.priceRepo.create();
    priceObj.precio = data.price;
    priceObj.product = product;
    priceObj.fecha = new Date().toLocaleDateString();
    console.log(priceObj);
    this.priceRepo.save(priceObj);
    return {product,priceObj};
  }

  async update(id: number, changes: UpdateProductDto) {
    const obj = await this.productRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException(); 
    }
    if (changes.state === "PENDIENTE"){
      const cart_products = await this.cartProductRepo.find({
        where: { product: id },
      });
      for (let index = 0; index < cart_products.length; index++) {
        const cart_product = await this.cartProductRepo.findOne(cart_products[index].id, {relations:['cart', 'product', 'product.prices']});
        const price = await this.priceRepo.findOne({ 
        where: {product : cart_product.product.id},
        order: {fecha: "DESC"}
        });

        //update product stock
        changes.stock=obj.stock+cart_product.quantity;

        const subtotal = price.precio * cart_product.quantity *-1;
        cart_product.cart.subtotal=cart_product.cart.subtotal+subtotal;
        await this.cartRepo.save(cart_product.cart);

        await this.cartProductRepo.delete(cart_product.id);
      }
    }
    if (changes.category_id) {
      const newCat = await this.categoryRepo.findOne(changes.category_id);
      obj.category = newCat;
    }
    this.productRepo.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    this.productRepo.save(obj); //impacta el cambio en la base de datos
    if(changes.price){
      const priceObj = new Price()
      priceObj.precio = changes.price;
      priceObj.product = obj;
      priceObj.fecha = new Date().toLocaleDateString();
      this.priceRepo.save(priceObj);
    }
    return obj;
  }

  async updateStock(id: number, newStock: number) {
    const obj = await this.productRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    if (newStock) {
      obj.stock = newStock;
    }
    return this.productRepo.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.productRepo.delete(id); //elimina el registro con el id correspondiente
  }


  async itemExists(user_id: number, parameters: ExistsProductDto) {
    const cart = await this.cartRepo.findOne({where:{user:user_id}});
    
    const cartProduct = await this.cartProductRepo.findOne({
      where: { cart: cart, product: parameters.product_id },
    });
   
    if (!cartProduct) {
      throw new NotFoundException(`CartProduct not found`);
    }
    return cartProduct;
  }

}
