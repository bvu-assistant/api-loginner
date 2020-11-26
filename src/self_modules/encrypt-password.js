module.exports = { EncryptData }
const CryptoJS = require('crypto-js');
const salt = require('./salt');


async function EncryptData(studentID, password, sessionId)
{
    try
    {
        let stream = await new Promise( async(resolve, reject) =>
        {
            var _0xd2e2x5 = CryptoJS.enc.Hex.parse('e84ad660c4721ae0e84ad660c4721ae0');
            // console.log('_0xd2e2x5:', _0xd2e2x5);
            

            var _0xd2e2x6 = CryptoJS.enc.Utf8.parse(await GetPrivateKey(studentID, sessionId));
            // console.log('_0xd2e2x6:', _0xd2e2x6);
            


            var _0xd2e2x7 = CryptoJS.enc.Utf8.parse('CryptographyPMT-EMS');
            // console.log('_0xd2e2x7:', _0xd2e2x7);
            


            var _0xd2e2x8 = CryptoJS.PBKDF2(_0xd2e2x6.toString(CryptoJS.enc.Utf8), _0xd2e2x7, 
                            {
                                keySize: 128 / 32,
                                iterations: 1000
                            });


            var _0xd2e2x9 = CryptoJS.AES.encrypt(password, _0xd2e2x8,
                                {
                                    mode: CryptoJS.mode.CBC,
                                    iv: _0xd2e2x5,
                                    padding: CryptoJS.pad.Pkcs7
                                });


            let encryptedPassword = _0xd2e2x9.ciphertext.toString(CryptoJS.enc.Base64);
            return resolve(encryptedPassword);
        });
        
        return stream;
    }
    catch (err)
    {
        return "";
    }; 
}


async function GetPrivateKey(_0xd2e2xc, sessionId)
{
    let salt_key = await salt.getPrivateKey(_0xd2e2xc, sessionId);
    return salt_key;
}



// (async()=>
// {
//     try
//     {
//         console.log(await EncryptData('18033747', 'vw2yDZ80', 'fddbf0a433a33d33c4f4d67d31df02ea'));
//     }
//     catch(err)
//     {
//         console.error(err);
//     }
// })();