const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/XemLichHoc.aspx';

const request = require('request');
const cheerio = require('cheerio');
const nomalScheduleViewer = require('../../normal-schedule-viewer');



class LichHoc extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }


    static async getLichHoc(ssid) {
        console.log('\n\nGetting LichHoc...');
        return nomalScheduleViewer.getThisWeekSchedules(link, ssid);
    }

}


module.exports = LichHoc;