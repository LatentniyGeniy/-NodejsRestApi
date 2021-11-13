const express = require('express');
const AbiturientRouter = require('./resources/abiturient/abiturient.router.js')
const ExamsRouter = require('./resources/exam/exam.router.js');
const TeacherRouter = require('./resources/teacher/teacher.router.js');

const app = express();


app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/abiturients', AbiturientRouter);
app.use('/exams', ExamsRouter);
app.use('/teachers', TeacherRouter);

module.exports = app;