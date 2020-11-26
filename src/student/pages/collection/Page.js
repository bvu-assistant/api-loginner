const request = require('request');



class Page
{
    static getRawHTML(pageURL = '', sessionId)
    {
        return new Promise((resolve, reject) =>
        {
            request({
                method: 'GET',
                url: pageURL,
                strictSSL: false,
                headers:
                {
                    'Cookie': `ASP.NET_SessionId=${sessionId}`
                }
            },
            (err, res, body) =>
            {
                if (err)
                    return resolve(undefined);

                return resolve(body);
            });
        });
    }
}


module.exports = Page;