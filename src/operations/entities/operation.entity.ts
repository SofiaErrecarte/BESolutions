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
import { Product } from 'src/products/entities/product.entity';
import { OperationItem } from './operationItem.entity';

@Entity() // importantisimo para que tyscript trate la clase como una entidad orm
export class Operation {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 50 })
  date: string;

  @Column({ type: 'text' })
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

  @ManyToMany(() => State, (state) => state.operations)
  @JoinTable({
    name: 'operations_states', //nombre de la tabla
    joinColumn: {
      name: 'operation_id', // Relación con la entidad donde estas situado.
    },
    inverseJoinColumn: {
      name: 'state_id', // Relación con la otra entidad.
    },
  })
  states: State[];

  @OneToOne(() => Delivery)
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;

  @OneToMany(() => OperationItem, (operationItem) => operationItem.operation)
  operationItems: OperationItem;

  //descomentar luego de ver con producto
  /*@ManyToMany(() => Product, (product) => product.operations)
  @JoinTable({
    name: 'operations_products', //nombre de la tabla que tambien puede ser products_has_categories
    joinColumn: {
      name: 'operation_id', // Relación con la entidad donde estas situado.
    },
    inverseJoinColumn: {
      name: 'product_id', // Relación con la otra entidad.
    },
  })
  products: Product[];*/
}
