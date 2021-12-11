import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Teacher1638270169632 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(
          new Table({
              name: 'teachers',
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
                      name: 'lastName',
                      type: 'varChar',
                      default: "'lastName'"
                  },
                  {
                      name: 'firstName',
                      type: 'varChar',
                      default: "'firstName'"
                  },
                  {
                      name: 'degree',
                      type: 'varChar',
                      default: "'professor'"
                  },
              ],
          }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('teachers');
    }

}

