const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/DanhGiaRenLuyen.aspx';

const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios').default;
const https = require('https');


class DiemRenLuyen extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }

    static async getDiemRenLuyen(ssid) {
        console.log('\nDang lay diem ren luyen...');

        return new Promise((resolve, reject) => {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            axios.get(link, {
                headers: {
                    'Cookie': 'ASP.NET_SessionId=' + ssid
                },
                httpAgent: new https.Agent({
                    rejectUnauthorized: false,
                })
            }).then((res) => {
                let $ = cheerio.load(res.data, {decodeEntities: false});

                let table = $('table.grid.grid-color2');
                if (table.html() == null) {
                    console.log('No table found.');
                    return resolve('null');
                }

                return resolve(this.getDetails(res.data));
            })
            .catch((err) => {
                console.log(err);
                return resolve('null');
            });
        });
    }

    static async getDetails(body) {
        return new Promise((resolve, reject) => {
            let $ = cheerio.load(body, {decodeEntities: false});

            let terms = [];
            let isPoint = false;
            let isBonus = false;
            let currTermIndex = -1;


            $('table.grid.grid-color2').first().find('> tbody > tr:nth-child(n + 2)').each((index, elem) => {
                if ($(elem).children().length == 1) {   // is a new Term
                    terms.push({
                        term: $(elem).children().first().text().trim(),
                        rank: {
                            points: '',
                            rank: '',
                        },
                        bonus: [],
                    });
                    ++currTermIndex;
                }
                else {
                    if ($(elem).attr('align') == 'center') {    // is Rank - Point
                        if (!isPoint) {
                            isPoint = true;
                            isBonus = false;
                            terms[currTermIndex].rank.points = $(elem).find('> td:nth-child(2)').text().trim();
                        }
                        else {
                            isPoint = false;
                            isBonus = false;
                            terms[currTermIndex].rank.rank = $(elem).find('> td:nth-child(2)').text().trim();
                        }
                    }
                    else {
                        if (isBonus == false) { // is bonus
                            isBonus = true;
                        }
                        else {
                            terms[currTermIndex].bonus.push({
                                date: $(elem).find('> td:nth-child(2)').text().trim(),
                                gained: $(elem).find('> td:nth-child(3)').text().trim(),
                                details: $(elem).find('> td:last-child').text().trim(),
                            });
                        }
                    }
                }
            });

            // this.sortTerms(terms);
            return resolve(terms.length? terms: 'null');
        });
    }

    // static sortTerms(terms) {
    //     let len = terms.length;

    //     for (let i = 0; i < len; i++) {
    //         for (let j = i + 1; j < len - 1; j++) {
    //             if (terms[j].term < terms[j - 1].term)
    //                 this.exchange(terms[j], terms[j - 1]);
    //         }
    //     }
    // }

    // static exchange(a, b) {
    //     let c = a;
    //     a = b;
    //     b = c;
    // }
}


module.exports = DiemRenLuyen;