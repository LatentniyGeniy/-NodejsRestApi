import express from 'express';

import StudentsRouter from './resources/student/student.router';
import ExamsRouter  from './resources/exam/exam.router';
import TeacherRouter  from'./resources/teacher/teacher.router';

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/students', StudentsRouter);
app.use('/exams', ExamsRouter);
app.use('/teachers', TeacherRouter);

export default app;