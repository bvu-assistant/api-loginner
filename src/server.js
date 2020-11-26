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
    console.log(`\n\nBVU Loginner server listening on port: ${PORT}.`);
    console.log('Open browser on: http://localhost:' + PORT);
});



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const loginRoutes = require('./routes/login');
app.use('/login', loginRoutes);
const fetchRoutes = require('./routes/fetch');
app.use('/fetch', fetchRoutes);


app.get('/', (req, res) =>
{
    res.status(200).send('Server running Oke.');
});




// (async function() {

//     let ctk = require('./student/pages/collection/ChuongTrinhKhung');
//     let res = await ctk.getChuongTrinhKhung('dqymcifrlt51l40fngfajtyl');

//     console.log(JSON.stringify(res));
// })();