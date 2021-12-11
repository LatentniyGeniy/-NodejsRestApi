import TeachersRepo from './teacher.memory.repository';
import ExamRepo from '../exam/exam.memory.repository';
import {TTeacherModel, TTeacher} from './teacher.type'
import { TExamModel } from '../exam/exam.type';

const getAll = async (): Promise<TTeacherModel[]> => TeachersRepo.getAll();

const getById = async (id: string): Promise<TTeacherModel | null> => TeachersRepo.getById(id);

const getExamsByTeacherId = async (studentId: string): Promise<TExamModel[]> => ExamRepo.getExamsByTeacherId(studentId);

const createTeacher = async ({ lastName, firstName, degree }: TTeacher): Promise<TTeacherModel> =>
  TeachersRepo.createTeacher({ lastName, firstName, degree });

const deleteById = async (id:string): Promise<TTeacherModel | null> => {
  const teacherDeletable = await getById(id);
  await TeachersRepo.deleteById(id);
  await ExamRepo.deleteTeacherFromExam(id);

  return teacherDeletable;
};

const updateById = async (teacher: TTeacherModel): Promise<TTeacherModel | null> =>
  TeachersRepo.updateById(teacher);

export default { getAll, getById, createTeacher, deleteById, updateById,getExamsByTeacherId };
