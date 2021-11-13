const { StatusCodes } = require('http-status-codes');

const router = require('express').Router();
const Abiturient = require('./abiturient.model.js')
const Exam = require('../exam/exam.model')

const abiturientsService = require('./abiturient.service.js');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const abiturients = await abiturientsService.getAll();

    res.json(abiturients.map(Abiturient.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { lastName, firstName, numCertificate } = req.body;

    const abiturient = await abiturientsService.createAbiturient({ lastName, firstName, numCertificate });

    if (abiturient) {
      res.status(StatusCodes.CREATED).json(Abiturient.toResponse(abiturient));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'ABITURIENT_NOT_CREATE', msg: 'Abiturient not create' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const abiturient = await abiturientsService.getById(id);

    if (abiturient) {
      res.json(Abiturient.toResponse(abiturient));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ABITURIENT_NOT_CREATE', msg: 'Abiturient not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { lastName, firstName, numCertificate } = req.body;

    const abiturient = await abiturientsService.updateById({ id, lastName, firstName, numCertificate });

    if (abiturient) {
      res.status(StatusCodes.OK).json(Abiturient.toResponse(abiturient));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ABITURIENT_NOT_CREATE', msg: 'Abiturient not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;

    const abiturient = await abiturientsService.deleteById(id);

    if (!abiturient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ABITURIENT_NOT_FOUND', msg: 'Abiturient not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'ABITURIENT_DELETED', msg: 'The abiturient has been deleted' });
  })
);

router.route('/:abiturientID/exams').get(
  catchErrors(async (req, res) => {
    const { abiturientID } = req.params;

    const exam = await abiturientsService.getExamsByAbiturientId(abiturientID);

    if (exam) {
      res.json(exam.map(Exam.toResponse));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ABITURIENT_NOT_CREATE', msg: 'ABITURIENT not found' });
    }
  })
);

module.exports = router;
