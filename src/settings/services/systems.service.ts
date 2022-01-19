import {
  Injectable,
  NotFoundException,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { System } from '../entities/system.entity';

import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository

import {
  CreateSystemDto,
  UpdateSystemDto,
  FilterSystemDto,
} from '../dtos/system.dto';

@Injectable()
export class SystemsService {
  constructor(
    // @Inject('PG') private clientPg: Client,
    @InjectRepository(System) private repoSystem: Repository<System>, //injectar Repository
  ) {}

  async findAll(params?: FilterSystemDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.repoSystem.find({
        take: limit ? limit : 100, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset ? limit : 0, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.repoSystem.find();
  }

  async findOne(id: number) {
    const obj = await this.repoSystem.findOne(id);
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  async findByName(name: string) {
    const obj = await this.repoSystem.findOne({ name: name });
    if (obj) {
      throw new NotFoundException(`Object #${name} exists`);
    }
    return obj;
  }

  async create(data: CreateSystemDto) {
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
    const newObj = this.repoSystem.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea

    return this.repoSystem.save(newObj);
  }

  async update(id: number, changes: UpdateSystemDto) {
    const obj = await this.repoSystem.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.repoSystem.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.repoSystem.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.repoSystem.delete(id); //elimina el registro con el id correspondiente
  }
}
