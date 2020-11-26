const CryptoJS = require('crypto-js');




const key = CryptoJS.enc.Base64.parse('e84ad660c4721ae0e84ad660c4721ae0');
console.log(key);

const iv = 'AAAAAAAAAAAAAAAAAAAAAA==';

const encrypted = 'uM7/2qQNsOEY1DbYo/zzqkn4Dg3a2Ps4kmtZidd9inc=';


CryptoJS.AES.decrypt(encrypted, key);