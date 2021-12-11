import { EntityRepository, AbstractRepository } from 'typeorm';

import Teacher from './teacher.entity';

@EntityRepository(Teacher)
export class TeacherRepository extends AbstractRepository<Teacher> {
  createTeacher(teacher: Omit<Teacher, 'id'>) {
    const teachers = this.repository.create(teacher);
    return this.manager.save(teachers);
  }

  getAllTeachers() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id }) ;
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }

  updateById(id: string, teacher: Omit<Teacher, 'id'>) {
    return this.repository.update({ id }, teacher);
  }
}
