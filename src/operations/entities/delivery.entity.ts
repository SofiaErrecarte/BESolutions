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
  OneToOne,
} from 'typeorm';

import { Type, Exclude, Expose } from 'class-transformer';
import { State } from './state.entity';
import { DeliveryToState } from './deliveryToState.entity';
import { Operation } from './operation.entity';

@Entity() // importantisimo para que tyscript trate la clase como una entidad orm
export class Delivery {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  code: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  shipper: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  shipperCellphone: string;

  @Column({ type: 'text', nullable: true })
  shipperAddress: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  estimatedDeliveryDate: string;

  @Column({ type: 'float' })
  price: number;

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

  /*@ManyToMany(() => State, (state) => state.deliveries)
  @JoinTable({
    name: 'deliveries_states', //nombre de la tabla
    joinColumn: {
      name: 'delivery_id', // Relación con la entidad donde estas situado.
    },
    inverseJoinColumn: {
      name: 'state_id', // Relación con la otra entidad.
    },
  })
  states: State[];*/

  @OneToMany(
    () => DeliveryToState,
    (deliveryToState) => deliveryToState.delivery,
  )
  deliveriesToStates: DeliveryToState[];

  @OneToOne(() => Operation, (operation) => operation.delivery) // specify inverse side as a second parameter
  operation: Operation;
}
