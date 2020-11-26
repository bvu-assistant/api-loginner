module.exports = { logOut }

const request = require('request');
const cheerio = require('cheerio');



function logOut(sessionId)
{
    return new Promise((resolve, reject) =>
    {
        request({
            method: 'POST',
            strictSSL: false,
            url: 'https://sinhvien.bvu.edu.vn/',
            headers: { 'Cookie': `ASP.NET_SessionId=${sessionId}` },
            form: require('querystring').stringify({
                __EVENTTARGET: "ctl00$ucRight1$lbtnLogout"
            })
        },
        (err, res, body) =>
        {
            let $ = cheerio.load(body, {decodeEntities: false});
            let title = $('title:contains("Object moved")');
            return resolve({status: res.statusCode, logOutSuccess: (title && title.text()) ? true:false});
        });
    });
}


// (async ()=>
// {
//    console.log(await logOut('yb4htnc2vwznzmiaoco3ikox'));
// })();