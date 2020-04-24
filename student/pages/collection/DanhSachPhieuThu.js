const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/DanhSachPhieuThu.aspx';


class DanhSachPhieuThu extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }
}


module.exports = DanhSachPhieuThu;