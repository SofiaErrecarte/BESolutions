import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert, //estas dos columnas se usan para que cuando se cree o se actualice
  BeforeUpdate, //un registro las fechas se actualicen solas createAt y updateAt
  ManyToMany,
} from 'typeorm';

import { Type, Exclude, Expose } from 'class-transformer';

import { Product } from './product.entity';

@Entity() // importantisimo para que tyscript trate la clase como una entidad orm
export class Category {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 255 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  name: string;

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

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
