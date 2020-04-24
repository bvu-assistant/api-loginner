const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/HoSoSinhVien.aspx';


class HoSoSinhVien extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }
}


module.exports = HoSoSinhVien;