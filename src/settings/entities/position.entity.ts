import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert, //estas dos columnas se usan para que cuando se cree o se actualice
  BeforeUpdate, //un registro las fechas se actualicen solas createAt y updateAt } from 'typeorm';
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { Line } from './line.entity';
import { Profilegps } from './profilegps.entity';
import { Playerdata } from '../../users/entities/playerdata.entity';

@Entity({ name: 'set_positions' }) // importantisimo para que tyscript trate la clase como una entidad orm
export class Position {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 100 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  name: string;

  @Column({ type: 'varchar', length: 10 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
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

  @ManyToOne(() => Line, (line) => line.positions)
  @JoinColumn({ name: 'line_id' })
  line: Line;

  @ManyToOne(() => Profilegps, (profilegps) => profilegps.positions)
  @JoinColumn({ name: 'profilegps_id' })
  profilegps: Profilegps;

  @OneToMany(() => Playerdata, (playerdata) => playerdata.position1)
  playersdata1: Playerdata[];

  @OneToMany(() => Playerdata, (playerdata) => playerdata.position2)
  playersdata2: Playerdata[];

  @OneToMany(() => Playerdata, (playerdata) => playerdata.position3)
  playersdata3: Playerdata[];
}
