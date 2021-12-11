import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';

import Student from './student.model';
import Exam from '../exam/exam.model';
import studentsService from './student.service';
import catchErrors from '../../common/catchErrors';

const router = Router({ mergeParams: true });

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const students = await studentsService.getAll();

    res.json(students.map(Student.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const { lastName, firstName, numCertificate } = req.body;

    const student = await studentsService.createStudent({ lastName, firstName, numCertificate });

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
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const student = await studentsService.getById(id || "");

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
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { lastName, firstName, numCertificate } = req.body;

    const student = await studentsService.updateById({ id: id || "", lastName, firstName, numCertificate });

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
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const student = await studentsService.deleteById(id || '');

    if (!student) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'STUDENT_NOT_FOUND', msg: 'Student not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'STUDENT_DELETED', msg: 'The student has been deleted' });
  })
);

router.route('/:studentId/exams').get(
  catchErrors(async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const exam = await studentsService.getExamsByStudentId(studentId || '');

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
