import {v4 as uuid} from 'uuid';

import {TStudentModel, TStudent} from './student.type';

class Student{
  id:string;

  lastName : string;

  firstName : string;

  numCertificate : number;

  constructor({
                lastName = 'Bruyok',
                firstName = 'Il',
                numCertificate = 345346,
              }: Partial<TStudent> = {}) {
    this.id = uuid();
    this.lastName = lastName;
    this.firstName = firstName;
    this.numCertificate = numCertificate;
  }

  static toResponse(student: TStudentModel):TStudentModel {
    const { id, lastName, firstName, numCertificate } = student;
    return { id, lastName, firstName, numCertificate};
  }
}

export default Student;