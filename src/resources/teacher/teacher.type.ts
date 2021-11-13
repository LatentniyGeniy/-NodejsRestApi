export interface TTeacher {
  lastName : string,
  firstName : string,
  degree : string,
}

export interface TTeacherModel extends TTeacher {
  id: string;
}