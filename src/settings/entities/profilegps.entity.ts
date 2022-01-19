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
import { Position } from './position.entity';
import { Playerdata } from '../../users/entities/playerdata.entity';

@Entity({ name: 'set_profilesgps' }) // importantisimo para que tyscript trate la clase como una entidad orm
export class Profilegps {
  @PrimaryGeneratedColumn() //PRIMARY KEY
  id: number;

  @Column({ type: 'varchar', length: 100 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  name: string;

  @Column({ type: 'varchar', length: 10 }) //ASIGNA TIPO VARCHAR CON 255 CARACTERES
  code: string;

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

  @OneToMany(() => Position, (position) => position.profilegps)
  positions: Position[];

  @OneToMany(() => Playerdata, (playerdata) => playerdata.profilegps)
  playersdata: Playerdata[];
}
