import { getCustomRepository } from 'typeorm';
import { StudentRepository } from './student.repository';
import Student from './student.entity';
import Exam from '../exam/exam.entity';
import { ExamRepository } from '../exam/exam.repository';

const getAll = async (): Promise<Student[]> => {
  const studentRepository = getCustomRepository(StudentRepository);
  return studentRepository.getAllStudents();
};

const getById = async (id: string): Promise<Student | null> => {
  const studentRepository = getCustomRepository(StudentRepository);
  const student = await studentRepository.getById(id);
  if (!student) return null;
  return student;
};

const createStudent = async (data: Omit<Student, 'id'>): Promise<Student> => {
  const studentRepository = getCustomRepository(StudentRepository);
  const student = await studentRepository.createStudent(data);
  return student;
};

const updateById = async (id: string, data: Omit<Student, 'id'>): Promise<Student | null> => {
  const studentRepository = getCustomRepository(StudentRepository);
  await studentRepository.updateById(id, data);
  const student = await studentRepository.getById(id);
  if (!student) return null;
  return student;
};

const getExamsByStudentId = async (studentId: string): Promise<Exam[] | null> => {
  const studentRepository = getCustomRepository(ExamRepository);
  const exams = await studentRepository.getExamsByStudentId(studentId!)
  if (!exams) return null;
  return exams
}

const deleteById = async (id: string): Promise<Student | null> => {
  const studentRepository = getCustomRepository(StudentRepository);
  const examRepository = getCustomRepository(ExamRepository)
  const studentDeletable = await studentRepository.getById(id);

  if (!studentDeletable) return null;

  const exams = await examRepository.getExamsByStudentId(id);
  exams.map(async ex=>ex.teacherId?examRepository.updateBySTID(id):examRepository.deleteById(ex.id))
  await studentRepository.deleteById(id);

  return studentDeletable;
};

export default { getAll, getById, createStudent, deleteById, updateById, getExamsByStudentId };
