const { v4: uuid } = require('uuid');

class Exam {
  constructor({
                id = uuid(),
                abiturientID = '1234',
                teacherID = '6476',
                date = '28.12.2021',
                score = 9
              } = {}) {
    this.id = id;
    this.abiturientID = abiturientID;
    this.teacherID = teacherID;
    this.date = date;
    this.score = score;
  }

  static toResponse(exam) {
    const { id, abiturientID, teacherID, date, score} = exam;
    return { id, abiturientID, teacherID, date, score};
  }
}

module.exports = Exam;