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
  OneToMany,
} from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { Operation } from './operation.entity';

@Entity()
export class OperationProduct {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Operation, (operation) => operation.operationProducts)
  @JoinColumn({ name: 'operation_id' })
  operation: Operation;

  @ManyToOne(() => Product, (product) => product.operationProducts)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
