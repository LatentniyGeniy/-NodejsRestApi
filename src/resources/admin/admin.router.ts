import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Admin from './admin.entity';
import adminsService from './admin.service';


const router = Router();

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    const admins = await adminsService.getAll();
    res.status(StatusCodes.OK).json(admins.map(Admin.toResponse));
  }),
);

router.route('/').post(
  asyncHandler(async (req: Request, res: Response) => {
    const admin = await adminsService.create(req.body);

    if (admin) {
      res.status(StatusCodes.CREATED).json(Admin.toResponse(admin));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'ADMIN_NOT_CREATE', msg: 'Admin not create' });
    }
  }),
);

router.route('/:id').get(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const admin = await adminsService.getById(id || '');

    if (admin) {
      res.json(Admin.toResponse(admin));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'ADMIN_NOT_FOUND', msg: 'Admin not found' });
    }
  }),
);

router.route('/:id').put(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const admin = await adminsService.updateById(id!, req.body);

    if (admin) {
      res.status(StatusCodes.OK).json(Admin.toResponse(admin));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'ADMIN_NOT_FOUND', msg: 'Admin not found' });
    }
  }),
);

router.route('/:id').delete(
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const admin = await adminsService.deleteById(id!);

    if (!admin) {
       res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ADMIN_NOT_FOUND', msg: 'Admin not found' });
    }

     res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'ADMIN_DELETED', msg: 'The admin has been deleted' });
  }),
);

export default router;