const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/DangKy.aspx';


class DangKyHocPhan extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }
}


module.exports = DangKyHocPhan;