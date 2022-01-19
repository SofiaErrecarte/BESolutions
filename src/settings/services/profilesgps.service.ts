import {
  Injectable,
  NotFoundException,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Profilegps } from '../entities/profilegps.entity';

import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository

import {
  CreateProfilegpsDto,
  UpdateProfilegpsDto,
  FilterProfilegpsDto,
} from '../dtos/profilegps.dto';

@Injectable()
export class ProfilesgpsService {
  constructor(
    // @Inject('PG') private clientPg: Client,
    @InjectRepository(Profilegps)
    private repoProfilegps: Repository<Profilegps>, //injectar Repository
  ) {}

  async findAll(params?: FilterProfilegpsDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.repoProfilegps.find({
        take: limit ? limit : 100, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset ? limit : 0, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.repoProfilegps.find();
  }

  async findOne(id: number) {
    const obj = await this.repoProfilegps.findOne(id);
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  async findByName(name: string) {
    const obj = await this.repoProfilegps.findOne({ name: name });
    if (obj) {
      throw new NotFoundException(`Object #${name} exists`);
    }
    return obj;
  }

  async create(data: CreateProfilegpsDto) {
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
    const newObj = this.repoProfilegps.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea

    return this.repoProfilegps.save(newObj);
  }

  async update(id: number, changes: UpdateProfilegpsDto) {
    const obj = await this.repoProfilegps.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.repoProfilegps.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.repoProfilegps.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.repoProfilegps.delete(id); //elimina el registro con el id correspondiente
  }
}
