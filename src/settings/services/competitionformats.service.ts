import {
  Injectable,
  NotFoundException,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Competitionformat } from '../entities/competitionformat.entity';

import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository

import {
  CreateCompetitionformatDto,
  UpdateCompetitionformatDto,
  FilterCompetitionformatDto,
} from '../dtos/competitionformat.dto';

@Injectable()
export class CompetitionformatsService {
  constructor(
    // @Inject('PG') private clientPg: Client,
    @InjectRepository(Competitionformat)
    private repoCompetitionformat: Repository<Competitionformat>, //injectar Repository
  ) {}

  async findAll(params?: FilterCompetitionformatDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.repoCompetitionformat.find({
        take: limit ? limit : 100, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset ? limit : 0, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.repoCompetitionformat.find();
  }

  async findOne(id: number) {
    const obj = await this.repoCompetitionformat.findOne(id);
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  async findByName(name: string) {
    const obj = await this.repoCompetitionformat.findOne({ name: name });
    if (obj) {
      throw new NotFoundException(`Object #${name} exists`);
    }
    return obj;
  }

  async create(data: CreateCompetitionformatDto) {
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
    const newObj = this.repoCompetitionformat.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea

    return this.repoCompetitionformat.save(newObj);
  }

  async update(id: number, changes: UpdateCompetitionformatDto) {
    const obj = await this.repoCompetitionformat.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.repoCompetitionformat.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.repoCompetitionformat.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.repoCompetitionformat.delete(id); //elimina el registro con el id correspondiente
  }
}
