const Student = require('../student/student');
const router = require('express').Router();
module.exports = router;


router.get('/HoSo', async(req, res) => {
    const ssid = req.query.ssid;

    try
    {
        const s = new Student({sessionId: ssid});
        const profile = await s.pages.HoSoSinhVien.getProfile(s.sessionId);

        if (profile)
        {
            res.status(200).send(profile);
            return;
        }
    }
    catch (err)
    {
        console.log(err);
    }
        
    res.status(404).send('Failed.');
});