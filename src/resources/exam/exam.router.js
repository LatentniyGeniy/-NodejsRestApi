const { StatusCodes } = require('http-status-codes');

const router = require('express').Router();
const Exam = require('./exam.model.js');

const examsService = require('./exam.service.js');
const catchErrors = require('../../common/catchErrors');
const Teacher = require('../teacher/teacher.model');


router.route('/').get(
  catchErrors(async (req, res) => {
    const exams = await examsService.getAll();

    res.json(exams.map(Exam.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { abiturientID, teacherID, date, score } = req.body;

    const exam = await examsService.createExam({ abiturientID, teacherID, date, score });

    if (exam) {
      res.status(StatusCodes.CREATED).json(Exam.toResponse(exam));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'EXAM_NOT_CREATE', msg: 'Exam not create' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const exam = await examsService.getById(id);

    if (exam) {
      res.json(Exam.toResponse(exam));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'EXAM_NOT_CREATE', msg: 'Exam not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { abiturientID, teacherID, date, score } = req.body;

    const exam = await examsService.updateById({ id, abiturientID, teacherID, date, score });

    if (exam) {
      res.status(StatusCodes.OK).json(Exam.toResponse(exam));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'EXAM_NOT_CREATE', msg: 'Exam not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const exam = await examsService.deleteById(id);

    if (!exam) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'EXAM_NOT_FOUND', msg: 'Exam not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'EXAM_DELETED', msg: 'The exam has been deleted' });
  })
);

router.route('/:examId/teachers').get(
  catchErrors(async (req, res) => {
    const { examId } = req.params;

    const teachers = await examsService.getTeachersByExamId(examId);

    if (teachers) {
      res.json(Teacher.toResponse(teachers));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'EXAM_NOT_CREATE', msg: 'Exam not found' });
    }
  })
);

module.exports = router;