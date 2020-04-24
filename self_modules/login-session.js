const md5_decoder = require('./md5-decoder');
const confirmImg_generator = require('./confirm-image-generator');


class LoginSession
{
    constructor(sessionId = undefined)
    {
        this.decodedMD5 = undefined;
        this.sessionId = undefined;
        this.rawMD5 = undefined;


        return new Promise( async(resolve, reject) =>
        {
            try
            {
                let confirmImage = await confirmImg_generator.getConfirmImage(sessionId);
                let md5Decoded = await md5_decoder.reverse(confirmImage.rawMD5);


                this.sessionId = confirmImage.sessionId;
                this.rawMD5 = confirmImage.rawMD5;
                this.decodedMD5 = md5Decoded;
                return resolve(this);
            }
            catch(err)
            {
                return reject(err);
            }
        });
    }
}

module.exports = LoginSession;