/* eslint-disable prettier/prettier */
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
import { Delivery } from './delivery.entity';
import { Operation } from './operation.entity';
import { DeliveryToState } from './deliveryToState.entity';
import { OperationToState } from './operationToState.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text' })
  description: string;

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
    () => DeliveryToState,
    (deliveryToState) => deliveryToState.delivery,
  )
  deliveriesToStates: DeliveryToState[];

<<<<<<< HEAD
  @OneToMany(
    () => OperationToState,
    (operationToState) => operationToState.operation,
  )
  operationsToStates: OperationToState[];
=======
  @ManyToMany(() => Operation, (operation) => operation.states)
  operations: Operation[];

  // @OneToMany(
  //   () => OperationToState,
  //   (operationToState) => operationToState.operation,
  // )
  // operationsToStates: OperationToState[];

>>>>>>> sofi
}
