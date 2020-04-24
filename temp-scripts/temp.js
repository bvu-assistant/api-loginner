
const Page = require('../student/pages/collection/Page');
const Student = require('../student/student');


(async ()=>
{
    try
    {
        let s = new Student('18033747', 'vw2yDZ80');
        let loggedin = await s.logIn();
    

        if (loggedin === true)
        {
            console.log(loggedin);
            
            // let profileHTML = await s.getRawHTML(s.pages.HoSoSinhVien);
            // console.log(profileHTML);
        }

        
    }
    catch(err)
    {
        console.log(err);
    }
})();