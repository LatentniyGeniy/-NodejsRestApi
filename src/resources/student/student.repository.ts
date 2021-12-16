import { EntityRepository, AbstractRepository } from 'typeorm';

import Student from './student.entity';

@EntityRepository(Student)
export class StudentRepository extends AbstractRepository<Student> {
  createStudent(student: Omit<Student, 'id'>) {
    const students = this.repository.create(student);
    return this.manager.save(students);
  }

  getAllStudents() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }

  updateById(id: string, student: Omit<Student, 'id'>) {
    return this.repository.update({ id }, student);
  }
}
