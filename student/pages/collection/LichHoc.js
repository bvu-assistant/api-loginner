const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/XemLichHoc.aspx';

const request = require('request');
const cheerio = require('cheerio');



class LichHoc extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }


    static async getLichHoc(ssid) {
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
                

                let table = $('table#detailTbl');
                if (table.html() == null) {
                    console.log('No table found.');
                    return resolve('null');
                }


                this.getDetails(body);
                return resolve(table.html());
            });
        });
    }


    static async getDetails(body) {
        return new Promise((resolve, reject) => {
            let $ = cheerio.load(body, {decodeEntities: false});
            let sessionIndex = 0;
            let dayIndex = 0;
            let days = {};


            let daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
            daysOfWeek.forEach(day => {
                days[day] = {};
                days[day]['morning'] = [];
                days[day]['afternoon'] = [];
                days[day]['evening'] = [];
            });



            $('table#detailTbl > tbody > tr:nth-child(n + 2)').each(async(index, elem) => {
                dayIndex = parseInt((index / 3));
                ++sessionIndex;


                if ($(elem).attr('class')) {  // the odd days of week
                    switch (sessionIndex) {
                        case 1: {
                            days[daysOfWeek[dayIndex]].morning.push(await this.getMorningSubjects(elem));
                            break;
                        }

                        case 2: {
                            // days[daysOfWeek[dayIndex]].afternoon = 'aO';
                            break;
                        }

                        case 3: {
                            // days[daysOfWeek[dayIndex]].evening = 'eO';
                            break;
                        }
                    }


                    if (sessionIndex === 3) {
                        sessionIndex = 0;
                    }
                }
                else    // the even days of week
                {
                    switch (sessionIndex) {
                        case 1: {
                            days[daysOfWeek[dayIndex]].morning.push(await this.getMorningSubjects(elem));
                            break;
                        }

                        case 2: {
                            // days[daysOfWeek[dayIndex]].afternoon = 'aE';
                            break;
                        }

                        case 3: {
                            // days[daysOfWeek[dayIndex]].evening = 'eE';
                            break;
                        }
                    }


                    if (sessionIndex === 3) {
                        sessionIndex = 0;
                    }
                }
            });


            console.log(sessionIndex);
            console.log(days);
        });
    }


    static async getMorningSubjects(tr) {
        return new Promise((resolve, reject) => {
            let $ = cheerio.load(tr, {decodeEntities: false});

            
            let table = $('table.table-lich_hoc');
            if (table.html() == null) {
                // console.log('No table found.');
                return resolve('');
            }


            let records = [];
            $('table.table-lich_hoc > tbody > tr').each((index, elem) => {
                let courseId = $(elem).find('td:nth-child(1)').text().trim();
                let subjectName = $(elem).find('td:nth-child(2)').text().trim();
                let session = $(elem).find('td:nth-child(3)').text().trim();
                let teacher = $(elem).find('td:nth-child(4)').text().trim();
                let className = $(elem).find('td:nth-child(5)').text().trim();
                let time = $(elem).find('td:nth-child(6)').text().trim();

                records.push({
                    courseId: courseId,
                    subjectName: subjectName,
                    session: session,
                    teacher: teacher,
                    className: className,
                    time: time
                });
            });


            return resolve(records);
        });
    }

}


module.exports = LichHoc;