import {
  Injectable,
  NotFoundException,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Line } from '../entities/line.entity';

import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository

import { CreateLineDto, UpdateLineDto, FilterLineDto } from '../dtos/line.dto';

@Injectable()
export class LinesService {
  constructor(
    // @Inject('PG') private clientPg: Client,
    @InjectRepository(Line) private repoLine: Repository<Line>, //injectar Repository
  ) {}

  async findAll(params?: FilterLineDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.repoLine.find({
        take: limit ? limit : 100, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset ? limit : 0, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.repoLine.find();
  }

  async findOne(id: number) {
    const obj = await this.repoLine.findOne(id);
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  async findByName(name: string) {
    const obj = await this.repoLine.findOne({ name: name });
    if (obj) {
      throw new NotFoundException(`Object #${name} exists`);
    }
    return obj;
  }

  async create(data: CreateLineDto) {
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
    const newObj = this.repoLine.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea

    return this.repoLine.save(newObj);
  }

  async update(id: number, changes: UpdateLineDto) {
    const obj = await this.repoLine.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.repoLine.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.repoLine.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.repoLine.delete(id); //elimina el registro con el id correspondiente
  }
}
