/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert, //estas dos columnas se usan para que cuando se cree o se actualice
  BeforeUpdate, //un registro las fechas se actualicen solas createAt y updateAt
  ManyToOne,
  ManyToMany,
  JoinTable, //este decorador se encrga de crear la tabla ternaria de la relacion N:N
  Index,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Type, Exclude, Expose } from 'class-transformer';
import { Category } from './category.entity';
import { Price } from './prices.entity';
import { User } from 'src/users/entities/user.entity';
import { CartProduct } from 'src/operations/entities/cartProduct.entity';
import { OperationProduct } from 'src/operations/entities/operationProduct.entity';

@Entity({ name: 'products' }) // importantisimo para que tyscript trate la clase como una entidad orm
// @Index(['price', 'stock']) //campos indexados
export class Product {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 255 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  image: string;

  @Column({ type: 'varchar' }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  state: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  created_at: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  updated_at: string;

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updated_at = new Date().toLocaleString();
  }

  @BeforeInsert()
  public setCreatedAt() {
    this.created_at = new Date().toLocaleString();
  }

  // @ManyToMany(() => Category, (category) => category.products)
  // @JoinTable({
  //   name: 'products_categories', //nombre de la tabla que tambien puede ser products_has_categories
  //   joinColumn: {
  //     name: 'product_id', // Relación con la entidad donde estas situado.
  //   },
  //   inverseJoinColumn: {
  //     name: 'category_id', // Relación con la otra entidad.
  //   },
  // })
  // categories: Category[];

  @OneToMany(() => Price, (price) => price.product,  {
    cascade: true,
  })
  prices: Price[];

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product,  {
    cascade: true,
  })
  cartProducts: CartProduct[];

  @OneToMany(() => OperationProduct, (operationProduct) => operationProduct.product,  {
    cascade: true,
  })
  operationProducts: OperationProduct[];

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  // @ManyToMany(() => Cart, (cart) => cart.products)
  // carts: Cart[];
}
