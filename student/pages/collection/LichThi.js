const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/XemLichThi.aspx';


class LichThi extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }

    static async getLichThi(ssid) {
        const testView = require('../../testSchedule-viewer');
        return testView.getTestSchedules(link, ssid);
    }
}


module.exports = LichThi;