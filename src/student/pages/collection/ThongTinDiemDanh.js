const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/ThongTinDiemDanh.aspx';
const request = require('request');
const cheerio = require('cheerio');



class ThongTinDiemDanh extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }

    static async getTTDiemDanh(ssid) {
        return new Promise((resolve, reject) => {
            request({
                method: 'GET',
                strictSSL: false,
                url: link,
                headers: {
                    'Cookie': `ASP.NET_SessionId=${ssid}`
                }
            },
            async(err, res, body) => {
                if (err) {
                    console.log(err);
                    return resolve('null');
                }


                const $ = cheerio.load(body, {decodeEntities: false});
                

                let table = $('table.grid.grid-color2');
                if (table == null) {
                    console.log('No table found.');
                    return resolve('null');
                }

                let details = await this.getDetails(body);
                return resolve(details.length ? details: 'null');
            });
        });
    }


    static async getDetails(body) {
        return new Promise((resolve, reject) => {
            const $ = cheerio.load(body, {decodeEntities: false});

            let subjects = [];
            $('table.grid.grid-color2 > tbody > tr:nth-child(n + 3):not(.row-sum)').each((index, elem) => {

                let subjectId = $(elem).find('> td:nth-child(2)').text().trim();
                let subjectName = $(elem).find('> td:nth-child(3)').text().trim();
                let credits = $(elem).find('> td:nth-child(4)').text().trim();
                let excusedAbsences = $(elem).find('> td:nth-child(5)').text().trim();
                let unExcusedAbsences = $(elem).find('> td:nth-child(6)').text().trim();

                subjects.push({
                    subjectId: subjectId,
                    subjectName: subjectName,
                    credits: credits,
                    excusedAbsences: excusedAbsences,
                    unExcusedAbsences: unExcusedAbsences
                });
            });

            return resolve(subjects);
        });
    }
}


module.exports = ThongTinDiemDanh;