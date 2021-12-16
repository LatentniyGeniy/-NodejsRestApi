import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1623884499190 implements MigrationInterface {
       public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(
          new Table({
              name: 'admins',
              columns: [
                  {
                      name: 'id',
                      type: 'uuid',
                      isPrimary: true,
                      isUnique: true,
                      generationStrategy: 'uuid',
                      default: `uuid_generate_v4()`,
                  },
                  {
                      name: 'name',
                      type: 'varchar',
                      default: "''",
                  },
                  {
                      name: 'login',
                      type: 'varchar',
                  },
                  {
                      name: 'password',
                      type: 'varchar',
                  },
              ],
          }),
          true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('admins');
    }
}
