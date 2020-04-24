module.exports = { getSalt: getPrivateKey }
const request = require('request');
const axios = require('axios').default;
const https = require('https');



function getPrivateKey(studentID, sessionId)
{
    return new Promise((resolve, reject) =>
    {
        request({
            method: 'POST',
            strictSSL: false,
            url: 'https://sinhvien.bvu.edu.vn/ajaxpro/AjaxCommon,PMT.Web.PhongDaoTao.ashx',
            headers:
            {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0',
                'Content-Type': 'application/json',
                'Cookie': `ASP.NET_SessionId=${sessionId}`,
                'X-AjaxPro-Method': 'GetPrivateKey',
            },
            json:
            {
                "salt": studentID
            }
        },
        (err, res, body) =>
        {
            // console.log('Request headers:', res.request.headers);
            // console.log('Repsonse headers:', res.headers);
            // console.log('Body:', body);

            const salt = body.split(';')[0].split('"').join('');
            // console.log('Salt key:', salt);
            return resolve(salt);
        });
    });
}


// (async () =>
// {
//     try
//     {
//         let privateKey = await getPrivateKey('18033747', 'yb4htnc2vwznzmiaoco3ikox');
//         console.log(privateKey);
//     }
//     catch (err)
//     {
//         console.error(err);
//     }
// })();