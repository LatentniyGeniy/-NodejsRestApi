import { getCustomRepository } from 'typeorm';
import Exam from './exam.entity';

import { ExamRepository } from './exam.repository';
import { TeacherRepository } from '../teacher/teacher.repository';
import Teacher from '../teacher/teacher.entity';

const getAll = async (): Promise<Exam[]> => {
  const examRepository = getCustomRepository(ExamRepository);
  return examRepository.getAllExams();
};

const getById = async (id: string): Promise<Exam | null> => {
  const examRepository = getCustomRepository(ExamRepository);
  const exam = await examRepository.getById(id);
  if (!exam) return null;
  return exam;
};

const createExam = async (data: Omit<Exam, 'id'>): Promise<Exam> => {
  const examRepository = getCustomRepository(ExamRepository);
  const exam = await examRepository.createExam(data);
  return exam;
};

const deleteById = async (id: string): Promise<Exam | null> => {
  const examRepository = getCustomRepository(ExamRepository);
  const examDeletable = await examRepository.getById(id);
  if (!examDeletable) return null;
  await examRepository.deleteById(id);

  return examDeletable;
};

const updateById = async (id: string, data: Omit<Exam, 'id'>): Promise<Exam | null> => {
  const examRepository = getCustomRepository(ExamRepository);
  await examRepository.updateById(id, data);
  const exam = await examRepository.getById(id);
  if (!exam) return null;
  return exam;
};

const getTeachersByExamId = async (examId: string): Promise<Teacher | null> => {
  const examRepository = getCustomRepository(ExamRepository);
  const teacherRepository = getCustomRepository(TeacherRepository);

  const exam = await examRepository.getById(examId)
  const teacher = await teacherRepository.getById(exam!.teacherId!)

  if (!teacher) return null;

  return teacher
}

export default { getAll, getById, createExam, deleteById, updateById, getTeachersByExamId };
