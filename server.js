const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
require('dotenv/config');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT;
app.listen(PORT, () =>
{
    console.log(`BVU Loginner server listening on port: ${PORT}.`);
});



app.get('/login', async(req, res) =>
{
    const studentID = req.query.id;
    const password = req.query.pass;
    const sessionId = req.query.sessionId;

    if (studentID && password)
    {
        const Student = require('./student/student');
        let student = new Student(studentID, password, sessionId);


        // console.log(studentID, password);
        res.status(200).send(await student.logIn());
        return;
    }


    res.status(404).send('Wrong param.');
});