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
  OneToOne,
  JoinTable,
  Index,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { Operation } from './operation.entity';
import { User } from 'src/users/entities/user.entity';
import { CartProduct } from './cartProduct.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'int' })
  subtotal: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  created_at: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  updated_at: string;

  @Column({ type: 'bool'})
  state: boolean;

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updated_at = new Date().toLocaleString();
  }

  @BeforeInsert()
  public setCreatedAt() {
    this.created_at = new Date().toLocaleString();
  }


  // @OneToOne(() => Operation, (operation) => operation.cart) // specify inverse side as a second parameter
  // operation: Operation;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
  cartProducts: CartProduct[];

  @ManyToOne(() => User, (supplier) => supplier.cart_supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier: User;
}
