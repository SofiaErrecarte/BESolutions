import {
  Injectable,
  NotFoundException,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Team } from '../entities/team.entity';

import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository

import { CreateTeamDto, UpdateTeamDto, FilterTeamDto } from '../dtos/team.dto';

@Injectable()
export class TeamsService {
  constructor(
    // @Inject('PG') private clientPg: Client,
    @InjectRepository(Team) private repoTeam: Repository<Team>, //injectar Repository
  ) {}

  async findAll(params?: FilterTeamDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.repoTeam.find({
        take: limit ? limit : 100, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset ? limit : 0, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.repoTeam.find();
  }

  async findOne(id: number) {
    const obj = await this.repoTeam.findOne(id);
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  async findByName(name: string) {
    const obj = await this.repoTeam.findOne({ name: name });
    if (obj) {
      throw new NotFoundException(`Object #${name} exists`);
    }
    return obj;
  }

  async create(data: CreateTeamDto) {
    const descriptionsObject = await this.findByName(data.name);
    if (descriptionsObject) {
      throw new HttpException(
        {
          message: `The name ${data.name} already exists.`,
          status: HttpStatus.CONFLICT,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newObj = this.repoTeam.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea

    return this.repoTeam.save(newObj);
  }

  async update(id: number, changes: UpdateTeamDto) {
    const obj = await this.repoTeam.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.repoTeam.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.repoTeam.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.repoTeam.delete(id); //elimina el registro con el id correspondiente
  }
}
