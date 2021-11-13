import express from 'express';

const StudentsRouter = require('./resources/student/student.router')
const ExamsRouter = require('./resources/exam/exam.router');
const TeacherRouter = require('./resources/teacher/teacher.router');

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