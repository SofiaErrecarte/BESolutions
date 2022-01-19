import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAtributePlayersdate1638028702535 implements MigrationInterface {
    name = 'updateAtributePlayersdate1638028702535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`updated_At\` \`updated_At\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`updated_At\` \`updated_At\` varchar(255) NOT NULL`);
    }

}
