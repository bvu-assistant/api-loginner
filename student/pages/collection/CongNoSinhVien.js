const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/CongNoSinhVien.aspx';


class CongNoSinhVien extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }
}


module.exports = CongNoSinhVien;