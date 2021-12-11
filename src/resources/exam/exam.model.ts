import {v4 as uuid} from 'uuid';

import {TExamModel, TExam} from './exam.type'

class Exam {
  id : string;

  studentId : string | null;

  teacherId : string | null;

  date : string;

  score : number;

  constructor({
                studentId = '1234',
                teacherId = '6476',
                date = '23.11.2021',
                score = 9
              }: Partial<TExam> = {}) {
    this.id = uuid();
    this.studentId = studentId;
    this.teacherId = teacherId;
    this.date = date;
    this.score = score;
  }

  static toResponse(exam: TExamModel):TExamModel {
    const { id, studentId, teacherId, date, score} = exam;
    return { id, studentId, teacherId, date, score};
  }
}

export default Exam;