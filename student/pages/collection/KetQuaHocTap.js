const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/XemDiem.aspx';


class KetQuaHocTap extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }
}


module.exports = KetQuaHocTap;