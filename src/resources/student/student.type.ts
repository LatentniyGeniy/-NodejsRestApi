export interface TStudent {
  lastName : string,
  firstName : string,
  numCertificate : number,
}

export interface TStudentModel extends TStudent {
  id: string;
}