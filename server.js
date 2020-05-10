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



const loginRoutes = require('./routes/login');
app.use('/login', loginRoutes);
const fetchRoutes = require('./routes/fetch');
app.use('/fetch', fetchRoutes);


app.get('/', (req, res) =>
{
    res.status(200).send('Server running Oke.');
});