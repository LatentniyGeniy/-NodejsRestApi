import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';


@Entity({ name: 'students' })
class Student {
  @PrimaryColumn('uuid')
  id: string = uuid();

  @Column()
  public lastName: string = 'LastName';

  @Column()
  public firstName: string = 'FirstName';

  @Column('integer')
  numCertificate: number = 0;

  static toResponse(student: Omit<Student, 'id'>) {
    return student;
  }
}

export default Student;