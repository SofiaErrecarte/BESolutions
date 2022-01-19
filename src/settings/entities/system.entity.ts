import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert, //estas dos columnas se usan para que cuando se cree o se actualice
  BeforeUpdate, //un registro las fechas se actualicen solas createAt y updateAt } from 'typeorm';
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { Systemposition } from '../entities/systemposition.entity';

@Entity({ name: 'set_systems' }) // importantisimo para que tyscript trate la clase como una entidad orm
export class System {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 100 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  name: string;

  @Column({ type: 'varchar', length: 100 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  code: string;

  @Column({ type: 'varchar', length: 10 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  state: string;

  @Column({ type: 'int' }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  numberofplayer: number;

  @Column({ type: 'varchar', length: 255 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  image: string;

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

  @OneToMany(() => Systemposition, (systemposition) => systemposition.system)
  systempositions: Systemposition[];
}
