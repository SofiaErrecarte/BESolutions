import {
  Injectable,
  NotFoundException,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Position } from '../entities/position.entity';

import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository

import {
  CreatePositionDto,
  UpdatePositionDto,
  FilterPositionDto,
} from '../dtos/position.dto';

@Injectable()
export class PositionsService {
  constructor(
    // @Inject('PG') private clientPg: Client,
    @InjectRepository(Position) private repoPosition: Repository<Position>, //injectar Repository
  ) {}

  async findAll(params?: FilterPositionDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.repoPosition.find({
        take: limit ? limit : 100, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset ? limit : 0, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.repoPosition.find();
  }

  async findOne(id: number) {
    const obj = await this.repoPosition.findOne(id);
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  async findByName(name: string) {
    const obj = await this.repoPosition.findOne({ name: name });
    if (obj) {
      throw new NotFoundException(`Object #${name} exists`);
    }
    return obj;
  }

  async create(data: CreatePositionDto) {
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
    const newObj = this.repoPosition.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea

    return this.repoPosition.save(newObj);
  }

  async update(id: number, changes: UpdatePositionDto) {
    const obj = await this.repoPosition.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.repoPosition.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.repoPosition.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.repoPosition.delete(id); //elimina el registro con el id correspondiente
  }
}
