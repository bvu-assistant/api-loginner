const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/DanhSachPhieuThu.aspx';

const request = require('request');
const cheerio = require('cheerio');



class DanhSachPhieuThu extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }

    static async getPhieuThu(ssid) {
        return new Promise((resolve, reject) => {
            request({
                method: 'GET',
                strictSSL: false,
                url: link,
                headers: {
                    'Cookie': 'ASP.NET_SessionId=' + ssid
                }
            },
            async(err, res, body) => {
                if (err) {
                    console.log(err);
                    return resolve('null');
                }


                let $ = cheerio.load(body, {decodeEntities: false});
                let table = $('table#tblPhieuThu');
                if (table.html() == null) {
                    console.log('No table found.');
                    return resolve('null');
                }


                let details = await this.getDetails(body);
                return resolve(details.length? details: 'null');
            });
        });
    }

    static async getDetails(body) {
        return new Promise((resolve, reject) => {
            let $ = cheerio.load(body, {decodeEntities: false});
            let records = [];

            $('table#tblPhieuThu > tbody > tr:nth-child(n + 2)').each((index, elem) => {
                let content = $(elem).find('> td:nth-child(2)').text().trim();
                let totalCost = $(elem).find('> td:nth-child(3)').text().trim();
                let bankName = $(elem).find('> td:nth-child(4)').text().trim();
                let transactionTime = $(elem).find('> td:nth-child(5)').text().trim();
                let dateOfPayment = $(elem).find('> td:nth-child(6)').text().trim();
                let debitStatus = $(elem).find('> td:nth-child(7)').text().trim();
                let detailsLink = 'https://sinhvien.bvu.edu.vn/' + $(elem).find('> td:nth-child(8) > a').attr('href');

                records.push({
                    content: content,
                    totalCost: totalCost,
                    bankName: bankName,
                    transactionTime: transactionTime,
                    dateOfPayment: dateOfPayment,
                    debitStatus: debitStatus,
                    detailsLink: detailsLink
                });
            });

            console.log('Records:', records);
            return resolve(records);
        });
    }
}


module.exports = DanhSachPhieuThu;