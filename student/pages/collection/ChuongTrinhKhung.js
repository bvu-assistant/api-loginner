const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/XemChuongTrinhKhung.aspx';
const request = require('request');
const cheerio = require('cheerio');
const qs = require('querystring');
require('dotenv/config');


class ChuongTrinhKhung extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }

    
    static async getChuongTrinhKhung(ssid) {
        let self = this;
        return new Promise((resolve, reject) => {
            request({
                method: 'POST',
                strictSSL: false,
                timeout: 5000,
                url: link,
                headers: {
                    'Referer': 'https://sinhvien.bvu.edu.vn/Default.aspx',
                    'Cookie': `ASP.NET_SessionId=${ssid}`
                },
                form: qs.stringify({
                    __EVENTTARGET: '',
                    __EVENTARGUMENT: '',
                    __LASTFOCUS: '',
                    __VIEWSTATE: process.env.VIEWSTATE,
                    ctl00$DdListMenu: '-1',
                    ctl00$ContentPlaceHolder$btnXem: 'Xem',
                })
            },
            async(err, res, body) => {
                if (err) {
                    console.log(err);
                    return resolve('null');
                }


                let $ = cheerio.load(body, {decodeEntities: false});
                let table = $('table.grid.grid-color2').html();
                
                if (table == null) {
                    console.log('No table found.');
                    return resolve('null');
                }


                return resolve({
                    analysisInfo: await self.getAnalysisInfo(body),
                    terms: await self.getDetails(body)
                });
            });
        });
    }


    static async getDetails(body) {
        return new Promise((resolve, reject) => {

            let $ = cheerio.load(body, {decodeEntities: false});
            let terms = [];
            let currTermIndex = -1;
            let isInRequired = false;


            $('table.grid.grid-color2 > tbody > tr').each((index, elem) => {
                let inlineStyle = $(elem).attr('style');
                

                // is a "new Term" or begin of a "type of Subject" (required/elective)
                if (inlineStyle) {
                    if (inlineStyle.indexOf('center') !== -1) { // is new Term
                        let termTitle = $(elem).find('td:first-child').first().text();
                        terms.push({
                            term: termTitle
                        });

                        ++currTermIndex;
                        isInRequired = false;
                    }
                    else {
                        if (inlineStyle.indexOf('#2994e7') !== -1) {    //  is new type of Term
                            let type = $(elem).find('td:first-child').text().indexOf('bắt buộc') !== -1? "required" : "elective";
                            if (type === "required") {
                                terms[currTermIndex]['requiredSubjects'] = [];
                                isInRequired = true;
                            }
                            else {
                                terms[currTermIndex]['electiveSubjects'] = [];
                                isInRequired = false;
                            }
                        }
                    }
                }
                else 
                    if ($(elem).hasClass('thongke') == false) {
                        let subjectId = $(elem).find('td:nth-child(2)').text();
                        let subjectName = $(elem).find('td:nth-child(3)').text().replace(/(\n {2,})/gm, '');
                        let courseId = $(elem).find('td:nth-child(4)').text();
                        let totalCredits = $(elem).find('td:nth-last-child(3)').text().split('(')[0];
                        let practiceLessons = $(elem).find('td:nth-last-child(2)').text();
                        let theoryLessons = $(elem).find('td:nth-last-child(1)').text();

                        let subjectInfo = {
                            subjectId: subjectId,
                            subjectName: subjectName,
                            courseId: courseId,
                            totalCredits: totalCredits,
                            practiceLessons: practiceLessons,
                            theoryLessons: theoryLessons
                        };


                        // is a subject
                        if (isInRequired) {
                            terms[currTermIndex].requiredSubjects.push(subjectInfo);
                        }
                        else {
                            if (terms[currTermIndex] !== undefined) {
                                terms[currTermIndex].electiveSubjects.push(subjectInfo);
                            }
                        }
                    }   
            });


            return resolve(terms);
        });
    }


    static async getAnalysisInfo(body) {
        return new Promise((resolve, reject) => {
            let $ = cheerio.load(body, {decodeEntities: false});
            let analysisInfo = {};


            $('table.grid.grid-color2 > tbody > tr.thongke:not(last-child)').each((index, elem) => {
                let value = $(elem).find('> td:nth-child(2)').text();
                switch (index) {
                    case 0: {
                        analysisInfo['totalSubjects'] = value;
                        break;
                    }

                    case 1: {
                        analysisInfo['requiredSubjects'] = value;
                        break;
                    }

                    case 2: {
                        analysisInfo['electiveSubjects'] = value;
                        break;
                    }
                }
            });


            return resolve(analysisInfo);
        });
    }

}


module.exports = ChuongTrinhKhung;



