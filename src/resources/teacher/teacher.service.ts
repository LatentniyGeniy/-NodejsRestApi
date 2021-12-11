import { getCustomRepository } from 'typeorm';
import { TeacherRepository } from './teacher.repository';
import Teacher from './teacher.entity'

import { ExamRepository } from '../exam/exam.repository';
import Exam from '../exam/exam.entity';

const getAll = async (): Promise<Teacher[]> => {
  const teacherRepository = getCustomRepository(TeacherRepository);
  return teacherRepository.getAllTeachers();
};

const getById = async (id: string): Promise<Teacher | null> => {
  const teacherRepository = getCustomRepository(TeacherRepository);
  const teacher = await teacherRepository.getById(id);
  if (!teacher) return null;
  return teacher;
};

const createTeacher = async (data: Omit<Teacher, 'id'>): Promise<Teacher> => {
  const teacherRepository = getCustomRepository(TeacherRepository);
  const teacher = await teacherRepository.createTeacher(data);
  return teacher;
};

const deleteById = async (id: string): Promise<Teacher | null> => {
  const teacherRepository = getCustomRepository(TeacherRepository);
  const teacherDeletable = await teacherRepository.getById(id);
  const examRepository = getCustomRepository(ExamRepository)

  if (!teacherDeletable) return null;

  const exams = await examRepository.getExamsByTeacherId(id);
  exams.map(async ex=>ex.studentId?examRepository.updateByTEID(id):examRepository.deleteById(ex.id))
  await teacherRepository.deleteById(id);

  return teacherDeletable;
};

const updateById = async (id: string, data: Omit<Teacher, 'id'>): Promise<Teacher | null> => {
  const teacherRepository = getCustomRepository(TeacherRepository);
  await teacherRepository.updateById(id, data);
  const teacher = await teacherRepository.getById(id);
  if (!teacher) return null;
  return teacher;
};

const getExamsByTeacherId = async (teacherId: string): Promise<Exam[] | null> => {
  const examRepository = getCustomRepository(ExamRepository);
  const exams = await examRepository.getExamsByTeacherId(teacherId!)
  if (!exams) return null;
  return exams
}

export default { getAll, getById, createTeacher, deleteById, updateById, getExamsByTeacherId };

