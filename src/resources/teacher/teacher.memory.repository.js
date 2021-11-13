const Teacher = require('./teacher.model.js');

const Teachers = [
  new Teacher({id: "Kalinin", lastName : 'Maxim', firstName : 'Kalinin', degree : 'GiuIOUyjh'}),
];

const getAll = async () => Teachers;

const getById = async (id) => Teachers.find((teacher) => teacher.id === id);

const getTeacherByExamId = async (teacherID) => {
  const TeacherByExamId = Teachers.find((teacher) => teacher.id === teacherID)
  return TeacherByExamId
};

const createTeacher = async ({ lastName , firstName, degree }) => {
  const teacher = new Teacher({ lastName , firstName, degree });
  Teachers.push(teacher);
  return teacher;
};

const deleteById = async (id) => {
  const teacherPosition = Teachers.findIndex((teacher) => teacher.id === id);

  if (teacherPosition === -1) return null;

  const teacherDeletable = Teachers[teacherPosition];
  Teachers.splice(teacherPosition, 1);
  return teacherDeletable;
};

const updateById = async ({ id, lastName , firstName, degree }) => {
  const teacherPosition = Teachers.findIndex((teacher) => teacher.id === id);

  if (teacherPosition === -1) return null;

  const oldTeacher = Teachers[teacherPosition];
  const newTeacher = { ...oldTeacher, lastName , firstName, degree };

  Teachers.splice(teacherPosition, 1, newTeacher);
  return newTeacher;
};

module.exports = {
  Teachers,
  getAll,
  getById,
  getTeacherByExamId,
  createTeacher,
  deleteById,
  updateById,
};
