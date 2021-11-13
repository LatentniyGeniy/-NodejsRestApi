const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();

const Teacher = require('./teacher.model.js');
const Exam = require('../exam/exam.model');
const TeacherService = require('./teacher.service.js');
const catchErrors = require('../../common/catchErrors');



router.route('/').get(
  catchErrors(async (req, res) => {
    const teachers = await TeacherService.getAll();

    res.json(teachers.map(Teacher.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { lastName, firstName, degree } = req.body;

    const teacher = await TeacherService.createTeacher({ lastName, firstName, degree });

    if (teacher) {
      res.status(StatusCodes.CREATED).json(Teacher.toResponse(teacher));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'TEACHER_NOT_CREATE', msg: 'Teacher not create' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const teacher = await TeacherService.getById(id);

    if (teacher) {
      res.json(Teacher.toResponse(teacher));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TEACHER_NOT_CREATE', msg: 'Teacher not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { lastName, firstName, degree } = req.body;

    const teacher = await TeacherService.updateById({ id, lastName, firstName, degree });

    if (teacher) {
      res.status(StatusCodes.OK).json(Teacher.toResponse(teacher));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TEACHER_NOT_CREATE', msg: 'Teacher not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const teacher = await TeacherService.deleteById(id);

    if (!teacher) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TEACHER_NOT_FOUND', msg: 'Teacher not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'TEACHER_DELETED', msg: 'The teacher has been deleted' });
  })
);

router.route('/:teacherID/exams').get(
  catchErrors(async (req, res) => {
    const  {teacherID}  = req.params;

    const exam = await TeacherService.getExamsByTeacherId(teacherID);

    if (exam) {
      res.json(exam.map(Exam.toResponse));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TEACHER_NOT_CREATE', msg: 'Teacher not found' });
    }
  })
);

module.exports = router;
