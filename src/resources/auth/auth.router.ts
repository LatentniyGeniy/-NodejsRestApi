import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import authService from "./auth.service";
import router from '../admin/admin.router';

router.route('/login').post(
  asyncHandler(async (req: Request, res: Response) => {
    const { login, password } = req.body;

    const token = await authService.gettingToken(login, password);
    if (!token) {
      res.status(StatusCodes.FORBIDDEN).send({
        auth: false,
        error: 'Login failed! Check authentication credentials',
      });
    }
    res.status(StatusCodes.OK).json({ auth: true, token });
  }),
);

export default router;