import ExamsRepo from './exam.memory.repository';
import TeacherRepo from '../teacher/teacher.memory.repository';
import {TExamModel, TExam} from './exam.type'
import { TTeacherModel } from '../teacher/teacher.type';

const getAll = async (): Promise<TExamModel[]> => ExamsRepo.getAll();

const getById = async (id: string): Promise<TExamModel | null> => ExamsRepo.getById(id);

const getTeachersByExamId = async (examId: string): Promise<TTeacherModel | undefined> => {
  const exam = await ExamsRepo.getTeacherIdByExamId(examId)
  return  TeacherRepo.getTeacherByExamId(exam)
}

const createExam = async ({studentId, teacherId, date, score }: TExam): Promise<TExamModel> =>
  ExamsRepo.createExam({ studentId, teacherId, date, score });

const deleteById = async (id: string): Promise<TExamModel | null> => {
  const examDeletable = await getById(id);
  await ExamsRepo.deleteById(id);

  return examDeletable;
};

const updateById = async (exam: TExamModel): Promise<TExamModel | null> =>
  ExamsRepo.updateById(exam );

export default { getAll, getById, createExam, deleteById, updateById, getTeachersByExamId };
