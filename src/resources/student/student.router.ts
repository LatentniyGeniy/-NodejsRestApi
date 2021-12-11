import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import Student from './student.entity';
import studentsService from './student.service';
import Exam from '../exam/exam.entity';

const router = Router({ mergeParams: true });

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    const students = await studentsService.getAll();
    res.status(StatusCodes.OK).json(students.map(Student.toResponse));
  })
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {
    const student = await studentsService.createStudent(req.body);

    if (student) {
      res.status(StatusCodes.CREATED).json(Student.toResponse(student));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'STUDENT_NOT_CREATE', msg: 'Student not create' });
    }
  })
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const student = await studentsService.getById(id!);

    if (student) {
      res.json(Student.toResponse(student));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'STUDENT_NOT_FOUND', msg: 'Student not found' });
    }
  })
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const student = await studentsService.updateById( id!,  req.body);

    if (student) {
      res.status(StatusCodes.OK).json(Student.toResponse(student));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'STUDENT_NOT_CREATE', msg: 'Student not found' });
    }
  })
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const student = await studentsService.deleteById(id!);

    if (!student) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'STUDENT_NOT_FOUND', msg: 'Student not found' });
    }
     res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'STUDENT_DELETED', msg: 'The student has been deleted' });
  })
);

router.route('/:studentId/exams').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const exam = await studentsService.getExamsByStudentId(studentId!);

    if (exam) {
      res.json(exam.map(Exam.toResponse));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'STUDENT_NOT_FOUND', msg: 'Student not found' });
    }
  })
);

export default router;
