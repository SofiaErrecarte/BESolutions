/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert, //estas dos columnas se usan para que cuando se cree o se actualice
  BeforeUpdate, //un registro las fechas se actualicen solas createAt y updateAt
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Type } from 'class-transformer';
import { Product } from './product.entity';

@Entity('prices') // importantisimo para que tyscript trate la clase como una entidad orm
export class Price {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'int'}) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  precio: number;

  @Column({ type: 'text'})
  @Type(() => Date)
  fecha: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  created_at: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  updated_at: string;

  @ManyToOne(() => Product, (product) => product.prices)
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updated_at = new Date().toLocaleString();
  }

  @BeforeInsert()
  public setCreatedAt() {
    this.created_at = new Date().toLocaleString();
  }

}
