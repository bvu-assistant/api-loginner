require('dotenv/config');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT;
app.use(PORT, () => {
    console.log('\n\nYour Server listening on PORT:', PORT);
    console.log('Open browser on: http://localhost:', PORT);
});

app.get('/', (req, res, next) => {
    res.status(200).send('Your Server running Oke.');
});
