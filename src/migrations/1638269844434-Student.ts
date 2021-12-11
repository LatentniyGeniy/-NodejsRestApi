import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Student1638269844434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(
          new Table({
              name: 'students',
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
                      name: 'numCertificate',
                      type: 'integer',
                      default: 0,
                  },
              ],
          }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('students');
    }

}
