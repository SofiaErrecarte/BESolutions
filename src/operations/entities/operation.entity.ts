/* eslint-disable prettier/prettier */
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert, //estas dos columnas se usan para que cuando se cree o se actualice
  BeforeUpdate, //un registro las fechas se actualicen solas createAt y updateAt
  ManyToOne,
  ManyToMany,
  OneToOne,
  JoinTable, //este decorador se encrga de crear la tabla ternaria de la relacion N:N
  Index,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Type, Exclude, Expose } from 'class-transformer';
import { Delivery } from './delivery.entity';
import { State } from './state.entity';
import { Cart } from './cart.entity';
import { OperationToState } from 'src/operations/entities/operationToState.entity';
import { OperationProduct } from './operationProduct.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('operations')
export class Operation {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'varchar' })
  @Type(() => Date)
  date: Date;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'int' })
  total: number;

  @Column({ type: 'int' })
  subtotal: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  created_at: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  updated_at: string;

  @Column({ type: 'bool'})
  paid: boolean;

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updated_at = new Date().toLocaleString();
  }

  @BeforeInsert()
  public setCreatedAt() {
    this.created_at = new Date().toLocaleString();
  }


  @OneToOne(() => Delivery, {
    cascade: true,
  })
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;

  // @OneToOne(() => Cart)
  // @JoinColumn({ name: 'cart_id' })
  // cart: Cart;

  @OneToMany(() => OperationProduct, (operationProduct) => operationProduct.operation, {
    cascade: true,
  })
  operationProducts: OperationProduct[];

  @ManyToOne(() => State, (state) => state.operations)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @ManyToOne(() => User, (user) => user.operation_user)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, (supplier) => supplier.operation_supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier: User;
}
