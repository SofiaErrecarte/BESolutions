import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountriesController } from './controllers/countries.controller';
import { CountriesService } from './services/countries.service';
import { Country } from './entities/country.entity';
import { Team } from './entities/team.entity';
import { Competitionformat } from './entities/competitionformat.entity';
import { Competition } from './entities/competition.entity';
import { Line } from './entities/line.entity';
import { Position } from './entities/position.entity';
import { Profilegps } from './entities/profilegps.entity';
import { System } from './entities/system.entity';
import { Systemposition } from './entities/systemposition.entity';
import { TeamsService } from './services/teams.service';
import { TeamsController } from './controllers/teams.controller';
import { CompetitionformatsService } from './services/competitionformats.service';
import { CompetitionformatsController } from './controllers/competitionformats.controller';
import { CompetitionsService } from './services/competitions.service';
import { CompetitionsController } from './controllers/competitions.controller';
import { LinesService } from './services/lines.service';
import { LinesController } from './controllers/lines.controller';
import { ProfilesgpsService } from './services/profilesgps.service';
import { ProfilesgpsController } from './controllers/profilesgps.controller';
import { PositionsService } from './services/positions.service';
import { PositionsController } from './controllers/positions.controller';
import { SystemsService } from './services/systems.service';
import { SystemsController } from './controllers/systems.controller';
import { SystempositionsService } from './services/systempositions.service';
import { SystempositionsController } from './controllers/systempositions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Country,
      Team,
      Competitionformat,
      Competition,
      Line,
      Profilegps,
      Position,
      System,
      Systemposition,
    ]),
  ],
  controllers: [
    CountriesController,
    TeamsController,
    CompetitionformatsController,
    CompetitionsController,
    LinesController,
    ProfilesgpsController,
    PositionsController,
    SystemsController,
    SystempositionsController,
  ],
  providers: [
    CountriesService,
    TeamsService,
    CompetitionformatsService,
    CompetitionsService,
    LinesService,
    ProfilesgpsService,
    PositionsService,
    SystemsService,
    SystempositionsService,
  ],
  exports: [
    CountriesService,
    TeamsService,
    CompetitionformatsService,
    CompetitionsService,
    LinesService,
    ProfilesgpsService,
    PositionsService,
    SystemsService,
    SystempositionsService,
  ],
})
export class SettingsModule {}
