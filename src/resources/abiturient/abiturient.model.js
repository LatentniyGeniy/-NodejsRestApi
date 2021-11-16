const { v4: uuid } = require('uuid');

class Abiturient {
  constructor({
                id = uuid(),
                lastName = 'Bruyok',
                firstName = 'Il',
                numCertificate = 345346,
              } = {}) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.numCertificate = numCertificate;
  }

  static toResponse(abiturient) {
    const { id, lastName, firstName, numCertificate } = abiturient;
    return { id, lastName, firstName, numCertificate};
  }
}

module.exports = Abiturient;