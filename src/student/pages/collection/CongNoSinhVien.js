const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/CongNoSinhVien.aspx';


class CongNoSinhVien extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }

    static async getCongNo(ssid) {
        const liabilityView = require('../../liability-viewer');
        return liabilityView.getLiability(link, ssid);
    }
}


module.exports = CongNoSinhVien;