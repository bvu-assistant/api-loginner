const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/XemThongTinHDDT.aspx';


class HoaDonDienTu extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }
}


module.exports = HoaDonDienTu;