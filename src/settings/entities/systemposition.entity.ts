import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert, //estas dos columnas se usan para que cuando se cree o se actualice
  BeforeUpdate, //un registro las fechas se actualicen solas createAt y updateAt } from 'typeorm';
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { System } from './system.entity';

@Entity({ name: 'set_systempositions' }) // importantisimo para que tyscript trate la clase como una entidad orm
export class Systemposition {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 100 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  name: string;

  @Column({ type: 'varchar', length: 100 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  code: string;

  @Column({ type: 'varchar', length: 3 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  numberposition: number;

  @Column({ type: 'int' }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  x: number;

  @Column({ type: 'int' }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  y: number;

  @Exclude() // serializa para excluir el campo en la respuesta de la api
  @Column({ type: 'varchar', length: 50, nullable: true })
  created_at: string;

  @Exclude() // serializa para excluir el campo en la respuesta de la api
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

  @ManyToOne(() => System, (system) => system.systempositions)
  @JoinColumn({ name: 'system_id' })
  system: System;
}