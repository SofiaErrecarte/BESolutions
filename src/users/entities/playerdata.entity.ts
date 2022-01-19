import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert, //estas dos columnas se usan para que cuando se cree o se actualice
  BeforeUpdate, //un registro las fechas se actualicen solas createAt y updateAt
  OneToOne,
  ManyToOne,
} from 'typeorm';

import { Type } from 'class-transformer';

import { User } from './user.entity';
import { Team } from '../../settings/entities/team.entity';
import { Profilegps } from 'src/settings/entities/profilegps.entity';
import { Position } from 'src/settings/entities/position.entity';

@Entity({ name: 'use_playersdata' })
export class Playerdata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  height: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  weight: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  foot: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  gpsId: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  hudlId: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nacsportsId: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  longomatchId: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  angleId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tranfermarketId: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  tranfermarketLink: string;

  @Column({ type: 'varchar' })
  @Type(() => Date)
  created_At: Date;

  @Column({ type: 'varchar', nullable: true })
  @Type(() => Date)
  updated_At?: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.created_At = new Date();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updated_At = new Date();
  }

  @OneToOne(() => User, (user) => user.playerdata, { nullable: false })
  user: User;

  @ManyToOne(() => Team, (team) => team.playersdata)
  team: Team;

  @ManyToOne(() => Profilegps, (profilegps) => profilegps.playersdata)
  profilegps: Profilegps;

  @ManyToOne(() => Position, (position) => position.playersdata1)
  position1: Position;

  @ManyToOne(() => Position, (position) => position.playersdata2)
  position2: Position;

  @ManyToOne(() => Position, (position) => position.playersdata3)
  position3: Position;
}
