module.exports = { getConfirmImage }
const request = require('request');



function getConfirmImage(sessionID = undefined)
{
    return new Promise((resolve, reject) =>
    {
        request
        ({
            method: 'POST',
            strictSSL: false,
            url: 'https://sinhvien.bvu.edu.vn/ajaxpro/AjaxConfirmImage,PMT.Web.PhongDaoTao.ashx',
            headers:
            {
                'X-AjaxPro-Method': 'CreateConfirmImage',
                'Cookie': `ASP.NET_SessionId=${sessionID}`,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0'
            }
        },
        (err, res, body) =>
        {
            if (err)
            {
                return reject(err);
            }
            else
            {
                const jBody = JSON.parse(body.split(';')[0]);   //  ép kiểu sang json
                const raw_md5 = jBody[1];   //  lấy mã xác nhận md5 từ body response


                //  tìm sessionId
                let sessionId = sessionID;
                let isNewSessionId = res.rawHeaders.find((elem) =>
                {
                    return elem.indexOf('NET_SessionId') !== -1;
                });
                if (isNewSessionId)
                {
                    sessionId = isNewSessionId.split(';')[0];
                    sessionId = sessionId.split('=')[1];
                }


                //  trả về Object
                let response = {rawMD5: raw_md5, sessionId: sessionId};
                return resolve(response);
            }
        });
    });
}


// (async ()=>
// {
//     try
//     {
//         console.log(await getConfirmImage('tvhijlwytlrklo13rydu4wv2'));
//     }
//     catch (error)
//     {
//         console.error(error);
//     }
// })();