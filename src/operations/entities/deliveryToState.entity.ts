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

@Entity()
export class DeliveryToState {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'text' })
  @Type(() => Date)
  date: Date;

  @ManyToOne(() => Delivery, (delivery) => delivery.deliveriesToStates)
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;

  @ManyToOne(() => State, (state) => state.deliveriesToStates)
  @JoinColumn({ name: 'state_id' })
  state: State;
}
