const usersRepo = require('./aditurient.memory.repository');

const getAll = () => usersRepo.getAll();

module.exports = { getAll };
