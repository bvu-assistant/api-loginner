

const confirm_img_gen = require('../self_modules/confirm-image-generator');
const md5_decoder = require('../self_modules/md5-decoder');

(async()=>
{
    let confirmImg = await confirm_img_gen.getConfirmImage('yb4htnc2vwznzmiaoco3ikox');
    let md5_decoded = await md5_decoder.reverse(confirmImg.md5);

    console.log(confirmImg, md5_decoded);
})();