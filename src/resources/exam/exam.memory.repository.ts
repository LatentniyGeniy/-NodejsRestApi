import Exam from './exam.model';
import {TExamModel, TExam} from './exam.type'

const EXAMS: TExamModel[] = [];

const getAll = async (): Promise<TExamModel[]> => EXAMS;

const getById = async (id: string): Promise<TExamModel | null> =>
  EXAMS.find((exam) => exam.id === id) || null;

const getExamsByStudentId = async (studentId: string): Promise<TExamModel[]> => {
  const examsByAb = EXAMS.filter((exam) => exam.studentId === studentId)
  return examsByAb
};

const getExamsByTeacherId = async (teacherId:string): Promise<TExamModel[]> => {
  const examsByTeacherId = EXAMS.filter((exam) => exam.teacherId === teacherId)
  return examsByTeacherId
};

const getTeacherIdByExamId = async (id: string): Promise<string | null> => {
  const ex = EXAMS.find((exam) => exam.id === id);

  if (ex === undefined) return null

  const examTeacherId = ex.teacherId;
  return examTeacherId
}

const createExam = async ({ studentId, teacherId, date, score }: TExam): Promise<TExamModel> => {
  const exam = new Exam({ studentId, teacherId, date, score });
  EXAMS.push(exam);
  return exam;
};

const deleteById = async (id: string): Promise<TExamModel | null> => {
  const examPosition = EXAMS.findIndex((exam) => exam.id === id);

  if (examPosition === -1) return null;

  const examDeletable = EXAMS[examPosition]!;
  EXAMS.splice(examPosition, 1);
  return examDeletable;
};

const updateById = async ({ id, ...payload }: Partial<TExamModel>): Promise<TExamModel | null> => {
  const examPosition = EXAMS.findIndex((exam) => exam.id === id);

  if (examPosition === -1) return null;

  const oldExam = EXAMS[examPosition]!;

  const newExam = { ...oldExam, ...payload };

  EXAMS.splice(examPosition, 1, newExam);
  return newExam;
}

const deleteStudentFromExam = async (studentId: string): Promise<TExamModel | null> => {
  const ABPosition = EXAMS.findIndex((exam) => exam.studentId === studentId);

  if (ABPosition === -1) return null;

  const newExam = EXAMS[ABPosition]!;
  newExam.studentId = null

  if (newExam.teacherId == null){
    EXAMS.splice(ABPosition, 1);
  }else {
    EXAMS.splice(ABPosition, 1, newExam);
  }

  return newExam;
};

const deleteTeacherFromExam = async (teacherId: string): Promise<TExamModel | null> => {
  const Position = EXAMS.findIndex((exam) => exam.teacherId === teacherId);

  if (Position === -1) return null;

  const newExam = EXAMS[Position]!;
  newExam.teacherId = null

  if (newExam.studentId == null){
    EXAMS.splice(Position, 1);
  }else {
    EXAMS.splice(Position, 1, newExam);
  }

  return newExam;
};

export default {
  EXAMS,
  getAll,
  getById,
  getExamsByStudentId,
  getExamsByTeacherId,
  getTeacherIdByExamId,
  createExam,
  deleteById,
  updateById,
  deleteStudentFromExam,
  deleteTeacherFromExam
};
