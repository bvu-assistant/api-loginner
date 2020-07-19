const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/XemDiem.aspx';


class KetQuaHocTap extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }

    static async getMarks(ssid) {
        const markView = require('../../mark_viewer');
        return markView.getMarks(link, ssid);
    }
}


module.exports = KetQuaHocTap;