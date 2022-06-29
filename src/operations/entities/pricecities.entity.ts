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

@Entity('priceCities')
export class PriceCities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar'  })
  cp_origen: string;

  @Column({ type: 'varchar'  })
  cp_destino: string;

  @Column({ type: 'varchar'  })
  origen: string;

  @Column({ type: 'varchar'  })
  destino: string;

  @Column({ type: 'decimal'  })
  price: number;

  @Column({ type: 'varchar', length: 255 })
  shipper: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  shipperCellphone: string;

  @Column({ type: 'text', nullable: true })
  shipperAddress: string;

  @OneToMany(() => Delivery, (delivery) => delivery.pricecities)
  deliveries: Delivery[];

}
