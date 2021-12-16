import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import config from '../common/config';

import { AdminRepository } from '../resources/admin/admin.repository';

const { JWT_SECRET_KEY } = config;

export const auth = asyncHandler(  (req: Request, res: Response, next: NextFunction) => {
  if(req.method === 'OPTIONS'){
    next()
  }
  try{
    const token = req.headers.authorization!.split(' ')[2]
    if (!token){
      res.status(StatusCodes.FORBIDDEN).json({massage:"A token is required for authentication"})
    }
    const decoded = <any>jwt.verify(token!, JWT_SECRET_KEY!)

    const {id} = decoded
    const adminRepository = getCustomRepository(AdminRepository);
    const user = adminRepository.getAdminById(id)
    if(!user){
      res.status(StatusCodes.UNAUTHORIZED).json({massage:"not authorized"})
    } else {
      next()
    }
  } catch (e){
    res.status(StatusCodes.UNAUTHORIZED).json({massage:"not authorized"})
  }
})