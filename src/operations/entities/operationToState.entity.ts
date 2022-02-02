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
} from 'typeorm';

import { Type, Exclude, Expose } from 'class-transformer';
import { State } from './state.entity';
import { Delivery } from './delivery.entity';
import { Operation } from './operation.entity';

@Entity()
export class OperationToState {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'text' })
  @Type(() => Date)
  date: Date;

  @ManyToOne(() => Operation, (operation) => operation.operationsToStates)
  @JoinColumn({ name: 'operation_id' })
  operation: Operation;

  @ManyToOne(() => State, (state) => state.deliveriesToStates)
  @JoinColumn({ name: 'state_id' })
  state: State;
}
