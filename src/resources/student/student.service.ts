import StudentsRepo from'./student.memory.repository';
import ExamRepo from '../exam/exam.memory.repository'
import {TStudentModel, TStudent} from './student.type'
import { TExamModel } from '../exam/exam.type';

const getAll = async (): Promise<TStudentModel[]>=> StudentsRepo.getAll();

const getById = async (id:string): Promise<TStudentModel | null> => StudentsRepo.getById(id);

const getExamsByStudentId = async (studentId: string): Promise<TExamModel[]> => ExamRepo.getExamsByStudentId(studentId);

const createStudent = async ({ lastName, firstName, numCertificate }: TStudent): Promise<TStudentModel> =>
  StudentsRepo.createStudent({ lastName, firstName, numCertificate });

const deleteById = async (id: string): Promise<TStudentModel | null> => {
  const studentDeletable = await getById(id);
  await StudentsRepo.deleteById(id);
  await ExamRepo.deleteStudentFromExam(id)

  return studentDeletable;
};

const updateById = async (student: TStudentModel ): Promise<TStudentModel | null> =>
  StudentsRepo.updateById(student);

export default { getAll, getById, createStudent, deleteById, updateById, getExamsByStudentId };
