import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert, //estas dos columnas se usan para que cuando se cree o se actualice
  BeforeUpdate, //un registro las fechas se actualicen solas createAt y updateAt } from 'typeorm';
  OneToMany,
} from 'typeorm';

import { Type, Exclude, Expose } from 'class-transformer';

import { Team } from './team.entity';
import { Competition } from './competition.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'set_countries' }) // importantisimo para que tyscript trate la clase como una entidad orm
export class Country {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 255 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  name: string;

  @Column({ type: 'varchar', length: 2 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  alpha2code: string;

  @Column({ type: 'varchar', length: 3 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  alpha3code: string;

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

  @OneToMany(() => Team, (team) => team.country)
  teams: Team[];

  @OneToMany(() => Competition, (competition) => competition.country)
  competitions: Competition[];

  @OneToMany(() => User, (user) => user.country)
  users: User[];
}
