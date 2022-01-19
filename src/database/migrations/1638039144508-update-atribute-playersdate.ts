import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAtributePlayersdate1638039144508 implements MigrationInterface {
    name = 'updateAtributePlayersdate1638039144508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`foot\` \`foot\` varchar(10) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`foot\` \`foot\` varchar(10) NOT NULL`);
    }

}
