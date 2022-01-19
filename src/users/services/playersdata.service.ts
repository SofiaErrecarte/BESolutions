import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { getManager } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { v4 as uuidv1 } from 'uuid';

import { Playerdata } from '../entities/playerdata.entity';
import { User } from '../entities/user.entity';

import { Position } from 'src/settings/entities/position.entity';
import {
  CreatePlayerdataDto,
  UpdatePlayerdataDto,
  FilterPlayerdataDto,
} from '../dtos/playerdata.dto';
import { CreateUserDto } from '../dtos/user.dto';

import { InjectRepository } from '@nestjs/typeorm'; //injectar Repository
import { Repository } from 'typeorm'; //injectar Repository

import { UsersService } from './users.service';
import { PositionsService } from '../../settings/services/positions.service';
import { ProfilesgpsService } from '../../settings/services/profilesgps.service';
import { CustomersService } from './customers.service';
import { CountriesService } from '../../settings/services/countries.service';

@Injectable()
export class PlayersdataService {
  constructor(
    // @Inject('PG') private clientPg: Client,
    @InjectRepository(User)
    private repoUser: Repository<User>, //injectar Repository
    @InjectRepository(Playerdata)
    private repoPlayerdata: Repository<Playerdata>,
    private usersService: UsersService,
  ) {}

  async findAll(params?: FilterPlayerdataDto) {
    if (params) {
      const { limit, offset } = params; // funcion de desconstruccion
      return await this.repoPlayerdata.find({
        relations: ['user'],
        take: limit, //typeorm toma como limit la variable take(tantos elementos)
        skip: offset, //typeorm toma como offset la variable take(el tamaño de la paginacion)
      });
    }
    return await this.repoPlayerdata.find({
      relations: ['user'], // para que cuando devuelva los objetos los devuelva con la relacion
    });
  }

  async findOne(id: number) {
    const obj = await this.repoPlayerdata.findOne(id);
    if (!obj) {
      throw new NotFoundException(`Object #${id} not found`);
    }
    return obj;
  }

  async create(data: CreatePlayerdataDto) {
    const dataPlayer = {
      height: data.height,
      weight: data.weight,
      foot: data.foot,
      gpsId: data.gpsId,
      hudlId: data.hudlId,
      nacsportsId: data.nacsportsId,
      longomatchId: data.longomatchId,
      angleId: data.angleId,
      tranfermarketId: data.tranfermarketId,
      tranfermarketLink: data.tranfermarketLink,
      teamId: data.teamId,
      profilegpsId: data.profilegpsId,
      positionId1: data.positionId1,
      positionId2: data.positionId2,
      positionId3: data.positionId3,
    };

    const newObj = this.repoPlayerdata.create(dataPlayer);

    let username = '';
    if (!data.username) username = uuidv1();
    else username = data.username;

    const randomstring = Math.random().toString(36).slice(-8); //generate a random word consisting of alphanumeric characters
    const hashPassword = await bcrypt.hash(randomstring, 10); // creo el hash del pass

    const dataUserDto = {
      name: data.name,
      lastname: data.lastname,
      username: username,
      password: hashPassword,
      email: data.email,
      role: 'player',
      birthday: data.birthday,
      image: data.image,
      smallimage: data.smallimage,
      resetPassword: 'no',
      state: 'active',
      playerdataId: newObj.id,
      customerId: data.customerId,
      countryId: data.countryId,
    };

    const usernameUser = await this.usersService.findByUsername(data.username);
    if (usernameUser) {
      throw new HttpException(
        {
          message: `The username ${data.username} already exists.`,
          status: HttpStatus.CONFLICT,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await getManager().transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(newObj);
        const newObjUser = await this.repoUser.create(dataUserDto);
        newObjUser.playerdata = newObj;
        return await transactionalEntityManager.save(newObjUser);
        // ...
      },
    );
    // this.repoPlayerdata.save(newObj);
    // const newObjUser = await this.repoUser.create(dataUserDto);
    // newObjUser.playerdata = newObj;
    // return this.repoUser.save(newObjUser);
  }

  async update(id: number, changes: UpdatePlayerdataDto) {
    const obj = await this.repoPlayerdata.findOne(id);
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    this.repoPlayerdata.merge(obj, changes); // mergea el registro de la base con el con los datos que se cambiaron y vienen en el Dto
    return this.repoPlayerdata.save(obj); //impacta el cambio en la base de datos
  }

  async remove(id: number) {
    //Si no existe, damos error.
    if (!(await this.findOne(id))) {
      throw new NotFoundException();
    }
    return this.repoPlayerdata.delete(id); //elimina el registro con el id correspondiente
  }
}
