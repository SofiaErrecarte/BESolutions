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
<<<<<<< HEAD
import { OperationToState } from './operationToState.entity';
=======
// import { OperationToState } from 'src/operations/entities/operationToState.entity';
>>>>>>> sofi


@Entity('operations')
export class Operation {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'text' })
  @Type(() => Date)
  date: Date;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'int' })
  total: number;

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

  @OneToMany(
    () => OperationToState,
    (operationToState) => operationToState.operation,
  )
  operationsToStates: OperationToState[];

  // @OneToMany(
  //   () => OperationToState,
  //   (operationToState) => operationToState.operation,
  // )
  // operationsToStates: OperationToState[];

  @OneToOne(() => Delivery)
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;

  @OneToOne(() => Cart)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}
