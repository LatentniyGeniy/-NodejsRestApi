import express, { Request, Response, NextFunction } from 'express';

import StudentsRouter from './resources/student/student.router';
import ExamsRouter  from './resources/exam/exam.router';
import TeacherRouter  from'./resources/teacher/teacher.router';
import AuthRouter  from'./resources/auth/auth.router';
import AdminsRouter  from'./resources/admin/admin.router';


import { successHttpLogger, errorHttpLogger, errorHandler } from './middlewares';
import { auth } from './middlewares/auth';

const app = express();

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(successHttpLogger);
app.use(errorHttpLogger);

app.use('/auth', AuthRouter)
app.use('/admins', auth, AdminsRouter);
app.use('/students', auth, StudentsRouter);
app.use('/exams', auth, ExamsRouter);
app.use('/teachers', auth, TeacherRouter);

app.use(errorHandler)

export default app;