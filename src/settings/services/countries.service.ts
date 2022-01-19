import {
  Injectable,
  NotFoundException,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Country } from '../entities/country.entity';

import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository

import {
  CreateCountryDto,
  UpdateCountryDto,
  FilterCountryDto,
} from '../dtos/country.dto';

@Injectable()
export class CountriesService {
  constructor(
    // @Inject('PG') private clientPg: Client,
    @InjectRepository(Country) private repoCountry: Repository<Country>, //injectar Repository
  ) {}

  async findAll(params?: FilterCountryDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.repoCountry.find({
        take: limit ? limit : 100, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset ? limit : 0, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.repoCountry.find();
  }

  async findOne(id: number) {
    const obj = await this.repoCountry.findOne(id);
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  async findByName(name: string) {
    const obj = await this.repoCountry.findOne({ name: name });
    if (obj) {
      throw new NotFoundException(`Object #${name} exists`);
    }
    return obj;
  }

  async create(data: CreateCountryDto) {
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
    const newObj = this.repoCountry.create(data); //setea cada propiedad con la propiedad de los datos que vienen de Dto contra la entidad que se crea

    return this.repoCountry.save(newObj);
  }

  async update(id: number, changes: UpdateCountryDto) {
    const obj = await this.repoCountry.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.repoCountry.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.repoCountry.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.repoCountry.delete(id); //elimina el registro con el id correspondiente
  }
}
