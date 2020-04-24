module.exports = {  }

const confirm_image = require('./confirm-image-generator');
const md5_decoder = require('./md5-decoder');
const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios').default;
const FormData = require('form-data');
const js_md5 = require('js-md5');
const https = require('https');
const salt = require('./salt');
const qs = require('querystring');
const passwordEncryptor = require('./encrypt-password');
require('dotenv/config');



function login(studentID, password)
{
    return new Promise( async(resolve, reject) =>
    {
        //  Lấy confirm image dựa vào SessionId
        let confirm_img = await confirm_image.getConfirmImage();

        //  Giả mã từ md5 sang giá trị gốc
        let md5_decoded = await md5_decoder.reverse(confirm_img.md5);

        //  Gom nhóm kết quả thành Object
        let loginSession = {sessionId: confirm_img.sessionId, md5: confirm_img.md5, md5_decoded: md5_decoded};
        // console.log(loginSession);


        //  Mã hoá mật khẩu
        let encryptedPassword = await passwordEncryptor.EncryptData(studentID, password, loginSession.sessionId);
        // console.log('Encrypted password:', encryptedPassword);
        


        request({
            method: 'POST',
            strictSSL: false,
            timeout: 5000,
            url: 'https://sinhvien.bvu.edu.vn/Default.aspx',
            headers:
            {
                'Referer': 'https://sinhvien.bvu.edu.vn/Default.aspx',
                'Cookie': `ASP.NET_SessionId=${loginSession.sessionId}`
            },
            form: qs.stringify(
            {
                __EVENTTARGET: '',
                ctl00$ucRight1$txtMaSV: studentID, 
                ctl00$ucRight1$txtMatKhau: encryptedPassword,
                ctl00$ucRight1$txtSercurityCode: loginSession.md5_decoded,
                ctl00$ucRight1$btnLogin: 'Đăng+Nhập'
            })
        },
        (err, res, body) =>
        {
            return resolve({statusCode: res.statusCode, location: res.headers.location, sessionId: loginSession.sessionId});
        });
    });
}


(async ()=>
{
    try
    {
        let responseLocation = await login('18033747', 'vw2yDZ80');
        console.log(responseLocation);
        
        require('./student-pages');
    }
    catch (err)
    {
        console.error(err);
    }
})();