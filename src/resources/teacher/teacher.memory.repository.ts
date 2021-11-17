import Teacher from './teacher.model'
import {TTeacherModel, TTeacher} from './teacher.type'

const TEACHERS:TTeacherModel[] = [];

const getAll = async (): Promise<TTeacherModel[]> => TEACHERS;

const getById = async (id: string): Promise<TTeacherModel | null> =>
  TEACHERS.find((teacher) => teacher.id === id) || null;

const getTeacherByExamId = async (id: string | null): Promise<TTeacherModel | undefined> => {
  const TeacherByExamId = TEACHERS.find((teacher) => teacher.id === id)
  return TeacherByExamId
};

const createTeacher = async ({ lastName , firstName, degree }: TTeacher): Promise<TTeacherModel> => {
  const teacher = new Teacher({ lastName , firstName, degree });
  TEACHERS.push(teacher);
  return teacher;
};

const deleteById = async (id: string): Promise<TTeacherModel | null> => {
  const teacherPosition = TEACHERS.findIndex((teacher) => teacher.id === id);

  if (teacherPosition === -1) return null;

  const teacherDeletable = TEACHERS[teacherPosition]!;
  TEACHERS.splice(teacherPosition, 1);
  return teacherDeletable;
};

const updateById = async ({ id, ...payload }: Partial<TTeacherModel>): Promise<TTeacherModel | null> => {
  const teacherPosition = TEACHERS.findIndex((teacher) => teacher.id === id);

  if (teacherPosition === -1) return null;

  const oldTeacher = TEACHERS[teacherPosition]!;
  const newTeacher = { ...oldTeacher, ...payload };

  TEACHERS.splice(teacherPosition, 1, newTeacher);
  return newTeacher;
};

export default {
  TEACHERS,
  getAll,
  getById,
  getTeacherByExamId,
  createTeacher,
  deleteById,
  updateById,
};
