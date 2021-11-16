import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';

import Teacher from './teacher.model';
import Exam from '../exam/exam.model';
import TeacherService from './teacher.service';
import catchErrors from '../../common/catchErrors';

const router = Router({ mergeParams: true });

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const teachers = await TeacherService.getAll();

    res.json(teachers.map(Teacher.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
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
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const teacher = await TeacherService.getById(id || '');

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
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { lastName, firstName, degree } = req.body;

    const teacher = await TeacherService.updateById({ id: id || '', lastName, firstName, degree });

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
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const teacher = await TeacherService.deleteById(id || '');

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

router.route('/:teacherId/exams').get(
  catchErrors(async (req: Request, res: Response) => {
    const  {teacherId}  = req.params;

    const exam = await TeacherService.getExamsByTeacherId(teacherId || '');

    if (exam) {
      res.json(exam.map(Exam.toResponse));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TEACHER_NOT_CREATE', msg: 'Teacher not found' });
    }
  })
);

export default router;
