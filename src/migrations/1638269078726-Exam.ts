import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Exam1638269078726 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(
          new Table({
              name: 'exams',
              columns: [
                  {
                      name: 'id',
                      type: 'uuid',
                      isPrimary: true,
                      isUnique: true,
                      generationStrategy: 'uuid',
                  },
                  {
                      name: 'studentId',
                      type: 'varChar',
                      length: '36',
                      isNullable: true,
                  },
                  {
                      name: 'teacherId',
                      type: 'varChar',
                      length: '36',
                      isNullable: true,
                  },
                  {
                      name: 'date',
                      type: 'varChar',
                      default: "'21.11.2021'"
                  },
                  {
                      name: 'score',
                      type: 'integer',
                      default: 0,
                  },
              ],
          }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('exams');
    }

}
