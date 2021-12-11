export interface TExam {
  studentId : string | null,
  teacherId : string | null,
  date : string,
  score : number
}

export interface TExamModel extends TExam {
  id: string;
}

