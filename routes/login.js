const router = require('express').Router();
module.exports = router;


router.post('/', async(req, res) =>
{
    const token = req.body.token;


    if (token)
    {
        const decrypted = await decryptToken(token);
        const splitted = decrypted.split('...');


        if (!splitted.length || splitted.length < 3)
        {
            console.log('Login falied, can\'t find the id and password.');
            res.status(404).send('failed');
            return;
        }


        const id = splitted[0];
        const pass = splitted[1];
        const sessionId = splitted[2] === 'null'? undefined:splitted[2];

        const Student = require('../student/student');
        const s = new Student(id, pass, sessionId);
        res.status(200).send(await s.logIn());
        return;
    }
    

    res.status(404).send('Wrong param.');
});



function decryptToken(token)
{
    return new Promise((resolve, reject) =>
    {
        const CryptoJS = require('crypto-js');
        console.log('\n\nDecrypting:', token);
        

        try
        {
            var bytes  = CryptoJS.AES.decrypt(token, 'e84ad660c4721ae0e84ad660c4721ae0');
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            console.log('Decrypted:', originalText);
            
            return resolve(originalText || 'Undefined');
        }
        catch(err)
        {
            return resolve('Undefined');
        }
    });
}