const Exam = require('./exam.model.js');

const Exams = [
  new Exam({ id: '3145316' ,abiturientID : 'Bruyo', teacherID : 'Kalinin', date : '28.11.2021', score : 9 }),
];

const getAll = async () => Exams;

const getById = async (id) => Exams.find((exam) => exam.id === id);

const getExamsByAbiturientId = async (abiturientID) => {
  const examsByAb = Exams.filter((exam) => exam.abiturientID === abiturientID)
  return examsByAb
};

const getExamsByTeacherId = async (teacherID) => {
  const examsByTeacherId = Exams.filter((exam) => exam.teacherID === teacherID)
  return examsByTeacherId
};

const getTeacherIdByExamId = async (id) => {
  const ex = Exams.find((exam) => exam.id === id);
  return ex.teacherID
}

const createExam = async ({ abiturientID, teacherID, date, score }) => {
  const exam = new Exam({ abiturientID, teacherID, date, score });
  Exams.push(exam);
  return exam;
};

const deleteById = async (id) => {
  const examPosition = Exams.findIndex((exam) => exam.id === id);

  if (examPosition === -1) return null;

  const examDeletable = Exams[examPosition];
  Exams.splice(examPosition, 1);
  return examDeletable;
};

const updateById = async ({ id, abiturientID, teacherID, date, score }) => {
  const examPosition = Exams.findIndex((exam) => exam.id === id);

  if (examPosition === -1) return null;

  const oldExam = Exams[examPosition];

  const newExam = { ...oldExam, abiturientID, teacherID, date, score };

  Exams.splice(examPosition, 1, newExam);
  return newExam;
}

const deleteAbiturientFromExam = async (abiturientID) => {
  const ABPosition = Exams.findIndex((exam) => exam.abiturientID === abiturientID);

  if (ABPosition === -1) return null;

  const newExam = Exams[ABPosition];
  newExam.abiturientID = null

  if (newExam.teacherID == null){
    Exams.splice(ABPosition, 1);
  }else {
    Exams.splice(ABPosition, 1, newExam);
  }

  return newExam;
};

const deleteTeacherFromExam = async (teacherID) => {
  const Position = Exams.findIndex((exam) => exam.teacherID === teacherID);

  if (Position === -1) return null;

  const newExam = Exams[Position];
  newExam.teacherID = null

  if (newExam.abiturientID == null){
    Exams.splice(Position, 1);
  }else {
    Exams.splice(Position, 1, newExam);
  }

  return newExam;
};

module.exports = {
  Exams,
  getAll,
  getById,
  getExamsByAbiturientId,
  getExamsByTeacherId,
  getTeacherIdByExamId,
  createExam,
  deleteById,
  updateById,
  deleteAbiturientFromExam,
  deleteTeacherFromExam
};
