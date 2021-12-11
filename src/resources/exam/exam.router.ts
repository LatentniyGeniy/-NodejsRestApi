import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import Exam from './exam.entity';
import examsService from './exam.service';
import Teacher from '../teacher/teacher.entity';

const router = Router({ mergeParams: true });

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    const exams = await examsService.getAll();
    res.status(StatusCodes.OK).json(exams.map(Exam.toResponse));
  }),
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {
    const exam = await examsService.createExam(req.body);

    if (exam) {
      res.status(StatusCodes.CREATED).json(Exam.toResponse(exam));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  })
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const exam = await examsService.getById(id! );

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
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const exam = await examsService.updateById(id!, req.body);

    if (exam) {
      res.status(StatusCodes.OK).json(Exam.toResponse(exam));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'EXAM_NOT_FOUND', msg: 'Exam not found' });
    }
  })
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const exam = await examsService.deleteById(id!);

    if (!exam) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'EXAM_NOT_FOUND', msg: 'Exam not found' });
    }
    res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'EXAM_DELETED', msg: 'The exam has been deleted' });
  })
);

router.route('/:examId/teachers').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { examId } = req.params;

    const teachers = await examsService.getTeachersByExamId(examId!);

    if (teachers) {
      res.json(Teacher.toResponse(teachers));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'EXAM_NOT_CREATE', msg: 'Exam not found' });
    }
  })
);

export default router;