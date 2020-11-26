module.exports = { login }

const LoginSession = require('./login-session');
const passwordEncryptor = require('./encrypt-password');
const request = require('request');
const qs = require('querystring');
require('dotenv/config');



function login(studentID, password, sessionId = undefined)
{
    return new Promise( async(resolve, reject) =>
    {
        let loginSession = await new LoginSession(sessionId);
        let encryptedPassword = await passwordEncryptor.EncryptData(studentID, password, loginSession.sessionId);
        

        request({
            method: 'POST',
            strictSSL: false,
            timeout: 5000,
            url: 'https://sinhvien.bvu.edu.vn/Default.aspx',
            headers: {
                'Referer': 'https://sinhvien.bvu.edu.vn/Default.aspx',
                'Cookie': `ASP.NET_SessionId=${loginSession.sessionId}`
            },
            form: qs.stringify({
                __EVENTTARGET: '',
                ctl00$ucRight1$txtMaSV: studentID, 
                ctl00$ucRight1$txtMatKhau: encryptedPassword,
                ctl00$ucRight1$txtSercurityCode: loginSession.decodedMD5,
                ctl00$ucRight1$btnLogin: 'Đăng+Nhập'
            })
        },
        (err, res, body) =>
        {
            if (err)
                return resolve(undefined);

            return resolve({
                statusCode: res.statusCode, 
                location: res.headers.location, 
                sessionId: loginSession.sessionId,
                isLoginSuccess: res.headers.location? true:false
            });
        });
    });
}


// (async ()=>
// {
//     try
//     {
//         let responseLocation = await login('18033747', 'vw2yDZ80', 'avvz5wozilo5qsmop0ygz52o');
//         console.log(responseLocation);
//     }
//     catch (err)
//     {
//         console.error(err);
//     }
// })();