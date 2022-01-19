/* eslint-disable prettier/prettier */
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert, //estas dos columnas se usan para que cuando se cree o se actualice
  BeforeUpdate, //un registro las fechas se actualicen solas createAt y updateAt
  OneToOne,
  JoinColumn,
  Unique,
  ManyToOne,
} from 'typeorm';

import { Playerdata } from './playerdata.entity';
import { Customer } from './customer.entity';
import { Country } from '../../settings/entities/country.entity';

import { Type, Exclude, Expose } from 'class-transformer';

@Unique(['username']) //uneque key
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
  smallimage: string;

  @Column({ type: 'varchar', length: 10, nullable: true }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  resetPassword: string;

  @Column({ type: 'varchar', length: 10 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  state: string;

  @Exclude() // serializa para excluir el campo en la respuesta de la api
  @Column({ type: 'varchar', length: 100, nullable: true }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  telegramChatId: string;

  @Exclude() // serializa para excluir el campo en la respuesta de la api
  @Column({ type: 'varchar', length: 10, nullable: true }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  telegramNotification: string;

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

  @OneToOne(() => Customer, (customer) => customer.user)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Country, (country) => country.users)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @OneToOne(() => Playerdata, (playerdata) => playerdata.user, {
    nullable: true,
  })
  @JoinColumn({ name: 'playerdata_id' })
  playerdata: Playerdata;
}
