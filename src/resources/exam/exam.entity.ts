import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryColumn } from 'typeorm';


@Entity({ name: 'exams' })
class Exam {
  @PrimaryColumn('uuid')
  id: string = uuid();

  @Column('varchar', { length: 36, nullable: true })
  studentId!: string | null;

  @Column('varchar', { length: 36, nullable: true })
  teacherId!: string | null;

  @Column()
  date: string = '21.11.2021';

  @Column('integer')
  score: number = 0;


  static toResponse(exam: Omit<Exam, 'id'>) {
    return exam;
  }
}

export default Exam;