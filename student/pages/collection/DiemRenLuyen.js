const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/DanhGiaRenLuyen.aspx';


class DiemRenLuyen extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }
}


module.exports = DiemRenLuyen;