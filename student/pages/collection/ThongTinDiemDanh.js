const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/ThongTinDiemDanh.aspx';


class ThongTinDiemDanh extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }
}


module.exports = ThongTinDiemDanh;