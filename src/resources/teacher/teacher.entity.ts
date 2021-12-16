import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';


@Entity({ name: 'teachers' })
class Teacher {
  @PrimaryColumn('uuid')
  id: string = uuid();

  @Column()
  public lastName: string = 'LastName';

  @Column()
  public firstName: string = 'FirstName';

  @Column()
  public degree: string = 'professor';


  static toResponse(teacher: Omit<Teacher, 'id'>) {
    return teacher;
  }
}

export default Teacher;