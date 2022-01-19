import {MigrationInterface, QueryRunner} from "typeorm";

export class updateAtributePlayersdate1638028567297 implements MigrationInterface {
    name = 'updateAtributePlayersdate1638028567297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_bdf017349b8c946273107536f5\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` ADD \`created_At\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` ADD \`updated_At\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` DROP COLUMN \`updated_At\``);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` DROP COLUMN \`created_At\``);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` ADD \`updatedAt\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` ADD \`createdAt\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_bdf017349b8c946273107536f5\` ON \`user\` (\`playerdata_id\`)`);
    }

}
