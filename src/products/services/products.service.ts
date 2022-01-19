import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository, Between, FindConditions } from 'typeorm'; //injectar Repository

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from './../dtos/products.dtos';

// import { BrandsService } from './../services/brands.service';
import { Category } from './../entities/category.entity';
import { Brand } from './../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>, //injectar Repository
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async findAll(params?: FilterProductDto) {
    if (params) {
      const where: FindConditions<Product> = {}; //para filtro
      const { limit, offset } = params; // funcion de desconstruccion
      const { minPrice, maxPrice } = params; // funcion de desconstruccion
      console.log(minPrice, maxPrice); //ver por consola los filtros
      if (minPrice && maxPrice) {
        //para filtro
        where.price = Between(minPrice, maxPrice);
      }
      return await this.productRepo.find({
        relations: ['brand'],
        where, //para filtro
        take: limit, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'], //cuando se busque un producto retornara con los objetos relacionados
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    // const newObj = new Product();
    // newObj.image = data.image;
    // newObj.name = data.name;
    // newObj.description = data.description;
    // newObj.price = data.price;
    // newObj.stock = data.stock;
    // newObj.name = data.name;
    const newObj = this.productRepo.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea
    if (data.brandId) {
      const obj = await this.brandRepo.findOne(data.brandId);
      newObj.brand = obj;
    }
    if (data.categoriesIds) {
      const listObj = await this.categoryRepo.findByIds(data.categoriesIds); //repository con findByIds mando un array de id nos devuelve un array de objetos
      newObj.categories = listObj;
    }
    return this.productRepo.save(newObj);
  }

  async update(id: number, changes: UpdateProductDto) {
    const obj = await this.productRepo.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    if (changes.brandId) {
      const objRel = await this.brandRepo.findOne(changes.brandId);
      obj.brand = objRel;
    }
    if (changes.categoriesIds) {
      const listObj = await this.categoryRepo.findByIds(changes.categoriesIds); //repository con findByIds mando un array de id nos devuelve un array de objetos
      obj.categories = listObj;
    }
    this.productRepo.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
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
}
