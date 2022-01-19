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

import { Country } from './country.entity';

@Entity({ name: 'set_competitions' }) // importantisimo para que tyscript trate la clase como una entidad orm
export class Competition {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 255 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  name: string;

  @Column({ type: 'varchar', length: 50 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  format: string;

  @Column({ type: 'varchar', length: 20 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  level: string;

  @Column({ type: 'varchar', length: 20 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  gender: string;

  @Column({ type: 'varchar', length: 10 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  divisionLevel: string;

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

  @ManyToOne(() => Country, (country) => country.competitions)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
