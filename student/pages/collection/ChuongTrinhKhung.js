const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/XemChuongTrinhKhung.aspx';



class ChuongTrinhKhung extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }

    
}


module.exports = ChuongTrinhKhung;