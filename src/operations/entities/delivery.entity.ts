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
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { DeliveryToState } from './deliveryToState.entity';
import { Operation } from './operation.entity';
import { PriceCities } from './pricecities.entity';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  // @Column({ type: 'varchar', length: 255 })
  // shipper: string;

  // @Column({ type: 'varchar', length: 50, nullable: true })
  // shipperCellphone: string;

  // @Column({ type: 'text', nullable: true })
  // shipperAddress: string;

  @Column({ type: 'varchar', nullable: true })
  estimatedDeliveryDate: string;

  @Column({ type: 'varchar', nullable: true })
  realDeliveryDate: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  created_at: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  updated_at: string;

  @Column({ type: 'decimal'  })
  price: number;

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updated_at = new Date().toLocaleString();
  }

  @BeforeInsert()
  public setCreatedAt() {
    this.created_at = new Date().toLocaleString();
  }

  // @OneToMany(
  //   () => DeliveryToState,
  //   (deliveryToState) => deliveryToState.delivery,
  // )
  // deliveriesToStates: DeliveryToState[];

  @OneToOne(() => Operation, (operation) => operation.delivery) // specify inverse side as a second parameter
  operation: Operation;

  @ManyToOne(() => PriceCities, (pricecities) => pricecities.deliveries)
  @JoinColumn({ name: 'priceId' })
  pricecities: PriceCities;

}
