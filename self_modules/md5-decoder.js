module.exports = { reverse }
const axios = require('axios').default;


function reverse(md5_string)
{
    return new Promise((resolve, reject) =>
    {
        axios.get(`https://md5.gromweb.com/?md5=${md5_string}`)
            .then(response =>
            {
                const body = response.data;
                let matched = String(body).match('<\s*em class="long-content string"[^>]*>(.*?)<\s*/\s*em>');
                

                if (matched && (matched !== null) && (matched.length > 1))
                {
                    return resolve(matched[1]);
                }
                else
                {
                    console.error('\nCan\'t decode your MD5. Maybe the MD5 invalid --- Or server doesn\'t response.');
                    return reject(undefined);
                }
            })
            .catch(error =>
                {
                    return reject(err);
                });
    });
}



// (async () =>
// {
//     try
//     {
//         let securityValue = await reverse('bfb99380ca27b9bb3c9beb9c8c4a720d');
//         console.log(securityValue);
//     }
//     catch(err)
//     {
//         console.error(err);
//     }
// })();