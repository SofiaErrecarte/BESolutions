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
} from 'typeorm';

import { Type, Exclude, Expose } from 'class-transformer';
import { Delivery } from './delivery.entity';
import { State } from './state.entity';
import { Product } from 'src/products/entities/product.entity';
import { Operation } from './operation.entity';

@Entity()
export class OperationItem {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  subtotal: number;

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

  /*@ManyToOne(() => Product, (product) => product.operationItems)
  @JoinColumn({ name: 'product_id' })
  product: Product;*/

  @ManyToOne(() => Operation, (operation) => operation.operationItems)
  @JoinColumn({ name: 'operation_id' })
  operation: Operation;
}
