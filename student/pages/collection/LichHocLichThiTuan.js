const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/LichHocLichThiTuan.aspx';


class LichHocLichThiTuan extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }
}


module.exports = LichHocLichThiTuan;