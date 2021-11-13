const AbiturientsRepo = require('./abiturient.memory.repository');
const ExamRepo = require('../exam/exam.memory.repository')

const getAll = () => AbiturientsRepo.getAll();

const getById = (id) => AbiturientsRepo.getById(id);

const getExamsByAbiturientId = (abiturientID) => ExamRepo.getExamsByAbiturientId(abiturientID);

const createAbiturient = ({ lastName, firstName, numCertificate }) =>
  AbiturientsRepo.createAbiturient({ lastName, firstName, numCertificate });

const deleteById = async (id) => {
  const abiturientDeletable = await getById(id);
  AbiturientsRepo.deleteById(id);
  ExamRepo.deleteAbiturientFromExam(id)

  return abiturientDeletable;
};

const updateById = ({ id, lastName, firstName, numCertificate }) =>
  AbiturientsRepo.updateById({ id, lastName, firstName, numCertificate });

module.exports = { getAll, getById, createAbiturient, deleteById, updateById, getExamsByAbiturientId };
