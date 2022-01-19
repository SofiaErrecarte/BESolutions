import {
  Injectable,
  NotFoundException,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Competition } from '../entities/competition.entity';

import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository

import {
  CreateCompetitionDto,
  UpdateCompetitionDto,
  FilterCompetitionDto,
} from '../dtos/competition.dto';

@Injectable()
export class CompetitionsService {
  constructor(
    // @Inject('PG') private clientPg: Client,
    @InjectRepository(Competition)
    private repoCompetition: Repository<Competition>, //injectar Repository
  ) {}

  async findAll(params?: FilterCompetitionDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.repoCompetition.find({
        take: limit ? limit : 100, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset ? limit : 0, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.repoCompetition.find();
  }

  async findOne(id: number) {
    const obj = await this.repoCompetition.findOne(id);
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  async findByName(name: string) {
    const obj = await this.repoCompetition.findOne({ name: name });
    if (obj) {
      throw new NotFoundException(`Object #${name} exists`);
    }
    return obj;
  }

  async create(data: CreateCompetitionDto) {
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
    const newObj = this.repoCompetition.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea

    return this.repoCompetition.save(newObj);
  }

  async update(id: number, changes: UpdateCompetitionDto) {
    const obj = await this.repoCompetition.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.repoCompetition.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.repoCompetition.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.repoCompetition.delete(id); //elimina el registro con el id correspondiente
  }
}
