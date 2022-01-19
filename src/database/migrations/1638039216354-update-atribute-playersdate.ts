import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAtributePlayersdate1638039216354 implements MigrationInterface {
    name = 'updateAtributePlayersdate1638039216354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`gpsId\` \`gpsId\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`hudlId\` \`hudlId\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`nacsportsId\` \`nacsportsId\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`longomatchId\` \`longomatchId\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`angleId\` \`angleId\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`tranfermarketId\` \`tranfermarketId\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`tranfermarketLink\` \`tranfermarketLink\` varchar(150) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`tranfermarketLink\` \`tranfermarketLink\` varchar(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`tranfermarketId\` \`tranfermarketId\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`angleId\` \`angleId\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`longomatchId\` \`longomatchId\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`nacsportsId\` \`nacsportsId\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`hudlId\` \`hudlId\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` CHANGE \`gpsId\` \`gpsId\` varchar(100) NOT NULL`);
    }

}
