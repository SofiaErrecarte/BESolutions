/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository

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
      console.log(params);
      const { seller, value, limit, offset } = params; // funcion de desconstruccion
      if (value){
        console.log(value);
        return await this.productRepo.query(`select * from products where name like '%${value}%'`);
      }
      if (seller){
        console.log(seller);
        return await this.productRepo.find({
        where: { user: seller },
        relations: ['categories', 'prices', 'user', 'cartProducts'],
        take: limit, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
      }
      return await this.productRepo.find({
        relations: ['categories', 'prices', 'user', 'cartProducts'],
        take: limit, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.productRepo.find({
      relations: ['categories', 'prices', 'user', 'cartProducts'], // para que cuando devuelva los objetos los devuelva con la relacion
    });
  }

  async findBySeller(id: number) {
    const seller = await this.userRepo.findOne(id);
      return await this.productRepo.find({
        where: { user: seller },
        relations: ['categories', 'prices', 'user', 'cartProducts'],
        // take: limit, //typeorm toma como limit la variable take(tantos elementos)
        // skip: offset, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    
    return await this.productRepo.find({
      relations: ['categories', 'prices', 'user', 'cartProducts'], // para que cuando devuelva los objetos los devuelva con la relacion
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['categories', 'prices', 'user', 'cartProducts'], //cuando se busque un producto retornara con los objetos relacionados
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`); 
    }
    return product;
  } 

  async create(data: CreateProductDto) {
    const newObj = this.productRepo.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea
    if (data.categoriesIds) {
      const listObj = await this.categoryRepo.findByIds(data.categoriesIds); //repository con findByIds mando un array de id nos devuelve un array de objetos
      newObj.categories = listObj;
    } 
    if (data.user_id) {
      const obj = await this.userRepo.findOne(data.user_id);
      newObj.user = obj;
    }
    this.productRepo.save(newObj); 
    const priceObj = new Price() //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea
    priceObj.precio = data.price;
    priceObj.product = newObj;
    priceObj.fecha = new Date().toLocaleDateString();
    this.priceRepo.save(priceObj);
    return {newObj,priceObj};
  }

  async update(id: number, changes: UpdateProductDto) {
    const obj = await this.productRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException(); 
    }
    if (changes.categoriesIds) {
      const listObj = await this.categoryRepo.findByIds(changes.categoriesIds); //repository con findByIds mando un array de id nos devuelve un array de objetos
      obj.categories = listObj;
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

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOne(categoryId);
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'], //si no le pedimos tambien la relacion, al hacer el filter categories va a estar indefinida
    });
    product.categories = product.categories.filter((item) => {
      return item.id !== categoryId;
    });
  }
  // eslint-disable-next-line prettier/prettier


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
