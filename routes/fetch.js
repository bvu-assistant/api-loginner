const Student = require('../student/student');
const router = require('express').Router();
module.exports = router;


router.get('/:method', async(req, res) => {
    const method = req.params.method;
    const ssid = req.query.ssid;

    console.log(method, ssid);
    

    try
    {
        const s = new Student({sessionId: ssid});
        let result = null;

        switch (method) {
            case 'HoSo': {
                result = await s.pages.HoSoSinhVien.getProfile(s.sessionId);
                break;
            }

            case 'CTKhung': {
                result = await s.pages.ChuongTrinhKhung.getChuongTrinhKhung(s.sessionId);
                break;
            }

            case 'DiemHocTap': {
                result = await s.pages.KetQuaHocTap.getMarks(s.sessionId);
                break;
            }
            
            case 'DiemRL': {
                result = await s.pages.DiemRenLuyen.getDiemRenLuyen(s.sessionId);
                break;
            }

            case 'CongNo': {
                result = await s.pages.CongNoSinhVien.getCongNo(s.sessionId);
                break;
            }

            case 'LichThi': {
                result = await s.pages.LichThi.getLichThi(s.sessionId);
                break;
            }

            case 'LichHoc': {
                result = await s.pages.LichHoc.getLichHoc(s.sessionId);
                break;
            }

            case 'DiemDanh': {
                result = await s.pages.ThongTinDiemDanh.getTTDiemDanh(s.sessionId);
                break;
            }


            case 'PhieuThu': {
                result = await s.pages.DanhSachPhieuThu.getPhieuThu(s.sessionId);
                break;
            }



            default: {
                res.status(404).send('Method not supported.');
                return;
            }
        }


        res.status(200).send(result);
        return;
    }
    catch (err)
    {
        console.log(err);
    }
        
    res.status(404).send('Failed.');
});