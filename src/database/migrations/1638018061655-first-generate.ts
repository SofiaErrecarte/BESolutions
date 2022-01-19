import {MigrationInterface, QueryRunner} from "typeorm";

export class firstGenerate1638018061655 implements MigrationInterface {
    name = 'firstGenerate1638018061655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_124456e637cca7a415897dce659\` ON \`order\``);
        await queryRunner.query(`CREATE TABLE \`order_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` varchar(50) NULL, \`updated_at\` varchar(50) NULL, \`quantity\` int NOT NULL, \`productId\` int NULL, \`orderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`use_playersdata\` (\`id\` int NOT NULL AUTO_INCREMENT, \`height\` decimal(5,2) NULL, \`weight\` decimal(5,2) NULL, \`foot\` varchar(10) NOT NULL, \`gpsId\` varchar(100) NOT NULL, \`hudlId\` varchar(100) NOT NULL, \`nacsportsId\` varchar(100) NOT NULL, \`longomatchId\` varchar(100) NOT NULL, \`angleId\` varchar(100) NOT NULL, \`tranfermarketId\` varchar(50) NOT NULL, \`tranfermarketLink\` varchar(150) NOT NULL, \`createdAt\` varchar(255) NOT NULL, \`updatedAt\` varchar(255) NOT NULL, \`teamId\` int NULL, \`profilegpsId\` int NULL, \`position1Id\` int NULL, \`position2Id\` int NULL, \`position3Id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`birthday\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`smallimage\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`resetPassword\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`state\` varchar(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`country_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`playerdata_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_bdf017349b8c946273107536f5\` (\`playerdata_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_bdf017349b8c946273107536f5\` ON \`user\` (\`playerdata_id\`)`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_904370c093ceea4369659a3c810\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_124456e637cca7a415897dce659\` FOREIGN KEY (\`customerId\`) REFERENCES \`use_customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_d72eb2a5bbff4f2533a5d4caff9\` FOREIGN KEY (\`customer_id\`) REFERENCES \`use_customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_b89cdc0829042ce01f20140eced\` FOREIGN KEY (\`country_id\`) REFERENCES \`set_countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_bdf017349b8c946273107536f55\` FOREIGN KEY (\`playerdata_id\`) REFERENCES \`use_playersdata\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` ADD CONSTRAINT \`FK_6844bea64023625342238cfeff2\` FOREIGN KEY (\`teamId\`) REFERENCES \`set_teams\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` ADD CONSTRAINT \`FK_f7f67c28e3f2a87d02c322acc23\` FOREIGN KEY (\`profilegpsId\`) REFERENCES \`set_profilesgps\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` ADD CONSTRAINT \`FK_a290a3730e8d038cc6fbb93fe2c\` FOREIGN KEY (\`position1Id\`) REFERENCES \`set_positions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` ADD CONSTRAINT \`FK_b8e874517d7ebaea751fff9bcdd\` FOREIGN KEY (\`position2Id\`) REFERENCES \`set_positions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` ADD CONSTRAINT \`FK_9beb177e2e392e17c16b09147b8\` FOREIGN KEY (\`position3Id\`) REFERENCES \`set_positions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` DROP FOREIGN KEY \`FK_9beb177e2e392e17c16b09147b8\``);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` DROP FOREIGN KEY \`FK_b8e874517d7ebaea751fff9bcdd\``);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` DROP FOREIGN KEY \`FK_a290a3730e8d038cc6fbb93fe2c\``);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` DROP FOREIGN KEY \`FK_f7f67c28e3f2a87d02c322acc23\``);
        await queryRunner.query(`ALTER TABLE \`use_playersdata\` DROP FOREIGN KEY \`FK_6844bea64023625342238cfeff2\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_bdf017349b8c946273107536f55\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_b89cdc0829042ce01f20140eced\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_d72eb2a5bbff4f2533a5d4caff9\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_124456e637cca7a415897dce659\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_904370c093ceea4369659a3c810\``);
        await queryRunner.query(`DROP INDEX \`REL_bdf017349b8c946273107536f5\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_bdf017349b8c946273107536f5\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`playerdata_id\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`country_id\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`state\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`resetPassword\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`smallimage\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birthday\``);
        await queryRunner.query(`DROP TABLE \`use_playersdata\``);
        await queryRunner.query(`DROP TABLE \`order_item\``);
        await queryRunner.query(`CREATE INDEX \`FK_124456e637cca7a415897dce659\` ON \`order\` (\`customerId\`)`);
    }

}
