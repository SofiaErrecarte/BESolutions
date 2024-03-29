/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository
import { Operation } from './../entities/operation.entity';
import {
  CreateOperationDto,
  FilterOperationDto,
  UpdateOperationDto,
} from '../dtos/operation.dtos';

import { Delivery } from './../entities/delivery.entity';
import { Cart } from './../entities/cart.entity';
import { OperationToState } from '../entities/operationToState.entity';
import { State } from '../entities/state.entity';
import { CartProduct } from '../entities/cartProduct.entity';
import { OperationProduct } from '../entities/operationProduct.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { PriceCities } from '../entities/pricecities.entity';
var mercadopago = require('mercadopago');

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Operation) private operationRepo: Repository<Operation>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Delivery) private deliveryRepo: Repository<Delivery>, //injectar Repository
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(State) private stateRepo: Repository<State>,
    @InjectRepository(OperationToState)
    private opToStateRepo: Repository<OperationToState>,
    @InjectRepository(CartProduct)
    private cartProductRepo: Repository<CartProduct>,
    @InjectRepository(OperationProduct)
    private operationProductRepo: Repository<OperationProduct>,
    @InjectRepository(PriceCities)
    private priceCitiesRepo: Repository<PriceCities>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll(params?: FilterOperationDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.operationRepo.find({
        relations: [ 'delivery','user','supplier','state', 'operationProducts', 'operationProducts.product'],
        take: limit, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.operationRepo.find({
      relations: [ 'delivery','user','supplier','state', 'operationProducts'], // para que cuando devuelva los objetos los devuelva con la relacion
      order: {id:"DESC"}
      

    });
  }

  async findOne(id: number) {
    const operation = await this.operationRepo.findOne(id, {
      relations: ['delivery', 'user','supplier','state', 'operationProducts'],
    });
    if (!operation) {
      throw new NotFoundException(`Operation #${id} not found`);
    }
    var objs = new OperationProduct();

    const operationsProducts = await this.operationProductRepo.find({ 
      where: {operation : operation},
      relations: ['product'],
    });
    
    return {operation,operationsProducts};
  }

  async findOnlyOne(id: number) {
    const operation = await this.operationRepo.findOne(id, {
      relations: ['delivery', 'delivery.pricecities', 'user','supplier','state', 'operationProducts'],
    });
    if (!operation) {
      throw new NotFoundException(`Operation #${id} not found`);
    }
    return operation;
  }


  async findActual(user: number){
    const userObj = await this.userRepo.findOne({ id: user });
    const operationObj = await this.operationRepo.findOne({
      where: { user: userObj, paid: false},
      relations: ['delivery', 'delivery.pricecities','user','supplier','state','operationProducts'],
     });

    return operationObj;
  }

  async findBySupplier(supplier: number) {
    const supplierObj = await this.userRepo.findOne({ id: supplier });
    const operationObj = await this.operationRepo.find({
      where:{supplier: supplierObj},
      relations: ['delivery','user','supplier','state','operationProducts'],
      order: {date:"DESC"}
     });
    // var objs = [];
    // for (let index = 0; index < operationObj.length; index++) {
    //   const element = operationObj[index];
    //   const operationsArray = await this.operationRepo.find({ 
    //     where: {operation : element},
    //     relations: ['delivery', 'cart','cart.user','cart.supplier','state'],
    //   });
    //   objs.push(operationsArray[0]);
    // }
    // return objs;
    return operationObj;
  }

  async findByBuyer(buyer: number) {
    const buyerObj = await this.userRepo.findOne({ id: buyer });
    const operationObj = await this.operationRepo.find({ 
      where:{user: buyerObj},
      relations: ['delivery','user','supplier','state','operationProducts'],
      order: {date:"DESC"}
    });
    var objs = new OperationProduct();
    for (let index = 0; index < operationObj.length; index++) {
      const element = operationObj[index];
      const operationsProdArray = await this.operationProductRepo.find({ 
        where: {operation : element},
        relations: ['product'],
      });
      objs[0]=operationsProdArray;
    }
    const operationsProducts = objs[0];
    return {operationObj,operationsProducts};
  }

  async create(data: CreateOperationDto) {
        
    const obj = await this.cartRepo.findOne(data.cartId, { relations: ['user','cartProducts','supplier']});

    //chequeo si hay otra operacion con paid false y le cambio el estado ates de crear la nueva
    const currentOperation = await this.operationRepo.findOne({
      where: { user: obj.user, paid: false},
      relations: ['delivery', 'delivery.pricecities','user','supplier','state','operationProducts'],
     });

     if (currentOperation){
      currentOperation.paid=true;
      await this.operationRepo.save(currentOperation);
     }

    const newObj = this.operationRepo.create(data);
    if (data.stateId) {
      const obj = await this.stateRepo.findOne(data.stateId);
      newObj.state = obj;
    }

    newObj.supplier=obj.supplier;
    newObj.user=obj.user;
    newObj.subtotal = obj.subtotal;
    newObj.paid=false; //está false por default en la base pero por las dudas

    
    
    var priceCity = await this.priceCitiesRepo.findOne({
      where:{cp_origen:obj.user.cp, cp_destino:obj.supplier.cp}
    });
    if (!priceCity) {
      priceCity = await this.priceCitiesRepo.findOne({
        where: {id:1}}
      );
    }
    const deliveryObj = new Delivery();
    deliveryObj.pricecities = priceCity;
    deliveryObj.price = priceCity.price;
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + priceCity.days);
    deliveryObj.estimatedDeliveryDate = fecha.toLocaleDateString();
    const delivery = this.deliveryRepo.create(deliveryObj);
    //this.deliveryRepo.save(delivery);

    newObj.delivery=delivery;

    newObj.total = newObj.subtotal + priceCity.price; 
    return this.operationRepo.save(newObj);
  }

  async update(id: number, changes: UpdateOperationDto) {
    const obj = await this.operationRepo.findOne(id,
      {relations: ['delivery', 'operationProducts', 'operationProducts.product']});
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    if (changes.deliveryId) {
      const objRel = await this.deliveryRepo.findOne({
        where: {id : changes.deliveryId},
        relations: ['operation','pricecities'],
      });
      obj.delivery = objRel;
    }
    if (changes.stateId) {
      const objRel = await this.stateRepo.findOne(changes.stateId);
      obj.state = objRel;
    }
    if (changes.stateId===3) {
      obj.delivery.realDeliveryDate= new Date().toLocaleString();
    }
    //si se cancela, se devuelve el stock al producto
    if (changes.stateId===6) {
      for (let index = 0; index < obj.operationProducts.length; index++) {
        const prod = await this.productRepo.findOne(obj.operationProducts[index].product)
        prod.stock=prod.stock+obj.operationProducts[index].quantity;
        await this.productRepo.save(prod);
      }
    }
    if (changes.deliveryId ) { 
      obj.total = obj.delivery.pricecities.price;
    }
    this.operationRepo.merge(obj, changes); 
    return this.operationRepo.save(obj); 
  }

  async updateState(id: number, changes: UpdateOperationDto) {
    const userObj = await this.userRepo.findOne({ id: id });
    const operationObj = await this.operationRepo.findOne({
      where: { user: userObj, paid: false},
      relations: ['delivery', 'delivery.pricecities','user','supplier','state','operationProducts', 'operationProducts.product'],
     });
     if (changes.stateId===6) {

      for (let index = 0; index < operationObj.operationProducts.length; index++) {
        
        const prod = await this.productRepo.findOne(operationObj.operationProducts[index].product)
        prod.stock=prod.stock+operationObj.operationProducts[index].quantity;
        await this.productRepo.save(prod);
      }
    }
    const objRel = await this.stateRepo.findOne(changes.stateId);
    operationObj.state = objRel;
    operationObj.paid=changes.paid;
   
    this.operationRepo.merge(operationObj, changes); 
    return this.operationRepo.save(operationObj); 
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.operationRepo.delete(id); //elimina el registro con el id correspondiente
  }

  async mercadopago(id:number){
    const operation = await this.operationRepo.findOne(id, {
      relations: ['delivery', 'user','supplier','state', 'operationProducts'],
    });
    mercadopago.configure({
        access_token: 'TEST-8326206947574076-011923-956dcabba44e289adb8c8b390292026c-185272120'
    });
    
    var preference = {
      items: [
        {
          title: 'Orden #'+operation.id,
          quantity: 1,
          currency_id: 'ARS',
          unit_price: operation.total
        }
      ],
      back_urls: {
        'success': 'http://localhost:3001/checkoutok',
        'pending': 'http://localhost:3001/checkoutfail',
        'failure': 'http://localhost:3001/checkoutfail'
      },
      auto_return: 'approved',
    };
    
    return mercadopago.preferences.create(preference)
    .then(function(response){
      // This value replaces the String "<%= global.id %>" in your HTML
        // global.id = response.body.id;
        return {'preferenceId':response.body.id}
      }).catch(function(error){
        console.log(error);
      });
  }


}
