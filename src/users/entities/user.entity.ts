/* eslint-disable prettier/prettier */
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert, //estas dos columnas se usan para que cuando se cree o se actualice
  BeforeUpdate, //un registro las fechas se actualicen solas createAt y updateAt
  Unique,
  OneToMany,
} from 'typeorm';

import { Type, Exclude } from 'class-transformer';
import { Product } from 'src/products/entities/product.entity';

@Unique(['username','cuitcuil']) //uneque key
@Entity() // importantisimo para que tyscript trate la clase como una entidad orm
export class User {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 255 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  name: string;

  @Column({ type: 'varchar', length: 255 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  lastname: string;

  @Column({ type: 'varchar', length: 255 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  username: string;

  @Exclude() // serializa para excluir el campo en la respuesta de la api
  @Column({ type: 'varchar', length: 255 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  password: string;

  @Column({ type: 'varchar', length: 255 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  email: string;

  @Column({ type: 'varchar', length: 255 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  role: string;

  @Column({ type: 'date', nullable: true }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  @Type(() => Date)
  birthday: Date;

  @Column({ type: 'varchar', length: 255, nullable: true }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  image: string;

  @Column({ type: 'varchar', length: 255, nullable: true }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  cuitcuil: string;

  @Exclude() // serializa para excluir el campo en la respuesta de la api
  @Column({ type: 'varchar', length: 50, nullable: true })
  created_at: string;

  @Exclude() // serializa para excluir el campo en la respuesta de la api
  @Column({ type: 'varchar', length: 50, nullable: true })
  updated_at: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updated_at = new Date().toLocaleString();
  }

  @BeforeInsert()
  public setCreatedAt() {
    this.created_at = new Date().toLocaleString();
  }
}
