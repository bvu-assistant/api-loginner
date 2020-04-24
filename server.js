const express = require('express');
const logger = require('body-parser');
const app = express();
require('dotenv/config');


const PORT = process.env.PORT;
app.listen(PORT, () =>
{
    console.log(`BVU Loginner server listening on port: ${PORT}.`);
});



app.get('/login', (req, res) =>
{
    const studentID = req.query.id;
    const password = req.query.pass;

    if (studentID && password)
    {
        console.log(studentID, password);
        res.status(200).send('Oke');
        return;
    }


    res.status(404).send('Wrong param.');
});