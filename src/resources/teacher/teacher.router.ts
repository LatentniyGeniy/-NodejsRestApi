import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import Teacher from './teacher.entity';
import TeacherService from './teacher.service';
import Exam from '../exam/exam.entity';

const router = Router({ mergeParams: true });

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    const teachers = await TeacherService.getAll();
    res.status(StatusCodes.OK).json(teachers.map(Teacher.toResponse));
  })
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {

    const teacher = await TeacherService.createTeacher(req.body);

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
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const teacher = await TeacherService.getById(id!);

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
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const teacher = await TeacherService.updateById(id!, req.body);

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
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const teacher = await TeacherService.deleteById(id!);

    if (!teacher) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'TEACHER_NOT_FOUND', msg: 'Teacher not found' });
    }
    res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'TEACHER_DELETED', msg: 'The teacher has been deleted' });
  })
);

router.route('/:teacherId/exams').get(
  asyncHandler(async (req: Request, res: Response) => {
    const  {teacherId}  = req.params;

    const exam = await TeacherService.getExamsByTeacherId(teacherId!);

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
