const Abiturient = require('./abiturient.model');

const Aditurients = [
  new Abiturient({ lastName: 'Bruyok', firstName: 'Ilya', numCertificate: 948352 }),
];

const getAll = async () => Aditurients;

const getById = async (id) => Aditurients.find((abiturient) => abiturient.id === id);

const createAbiturient = async ({ lastName, firstName, numCertificate }) => {
  const abiturient = new Abiturient({ lastName, firstName, numCertificate });
  Aditurients.push(abiturient);
  return abiturient;
};

const deleteById = async (id) => {
  const abiturientPosition = Aditurients.findIndex((abiturient) => abiturient.id === id);

  if (abiturientPosition === -1) return null;

  const abiturientDeletable = Aditurients[abiturientPosition];
  Aditurients.splice(abiturientPosition, 1);
  return abiturientDeletable;
};

const updateById = async ({ id, lastname, firstname, numCertificate }) => {
  const abiturientPosition = Aditurients.findIndex((abiturient) => abiturient.id === id);

  if (abiturientPosition === -1) return null;

  const oldAbiturient = Aditurients[abiturientPosition];
  const newAbiturient = { ...oldAbiturient, lastname, firstname, numCertificate };

  Aditurients.splice(abiturientPosition, 1, newAbiturient);
  return newAbiturient;
};

module.exports = {
  Users: Aditurients,
  getAll,
  getById,
  createAbiturient,
  deleteById,
  updateById,
};
