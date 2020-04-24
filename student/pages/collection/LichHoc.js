const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/XemLichHoc.aspx';


class LichHoc extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }
}


module.exports = LichHoc;