/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { DeliveryToState } from './deliveryToState.entity';
import { Operation } from './operation.entity';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  shipper: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  shipperCellphone: string;

  @Column({ type: 'text', nullable: true })
  shipperAddress: string;

  @Column({ type: 'text' })
  @Type(() => Date)
  estimatedDeliveryDate: Date;

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

  // @OneToMany(
  //   () => DeliveryToState,
  //   (deliveryToState) => deliveryToState.delivery,
  // )
  // deliveriesToStates: DeliveryToState[];

  // @OneToOne(() => Operation, (operation) => operation.delivery) // specify inverse side as a second parameter
  // operation: Operation;
}
