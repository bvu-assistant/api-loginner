const Page = require('./Page');


class ThuVien extends Page
{
    #link = 'http://lib.bvu.edu.vn:803/';

    
    static temp()
    {
        this.getRawHTML()
    }
}


module.exports = ThuVien;