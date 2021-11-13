import Student from './student.model';
import {TStudent, TStudentModel } from './student.type';

const STUDENTS: TStudentModel[] = [];

const getAll = async (): Promise<TStudentModel[]> => STUDENTS;

const getById = async (id: string): Promise<TStudentModel | null> =>
  STUDENTS.find((student) => student.id === id ) || null;

const createStudent = async ({ lastName,firstName, numCertificate }: TStudent): Promise<TStudentModel> => {
  const student = new Student({ lastName, firstName, numCertificate });
  STUDENTS.push(student);
  return student;
};

const deleteById = async (id: string): Promise<TStudentModel | null> => {
  const studentPosition = STUDENTS.findIndex((student) => student.id === id);

  if (studentPosition === -1) return null;

  const studentDeletable = STUDENTS[studentPosition]!;

  STUDENTS.splice(studentPosition, 1);
  return studentDeletable;
};

const updateById = async ({ id, ...payload }: Partial<TStudentModel>): Promise<TStudentModel | null> => {
  const studentPosition = STUDENTS.findIndex((student) => student.id === id);

  if (studentPosition === -1) return null;

  const oldStudent = STUDENTS[studentPosition]!;
  const newStudent = { ...oldStudent, ...payload};

  STUDENTS.splice(studentPosition, 1, newStudent);
  return newStudent;
};


export default {
  STUDENTS,
  getAll,
  getById,
  createStudent,
  deleteById,
  updateById,
};
