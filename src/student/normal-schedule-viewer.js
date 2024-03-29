
module.exports = 
{
    getThisWeekSchedules
}


require('dotenv').config();
const request = require('request');
const cheerio = require('cheerio');



async function getThisWeekSchedules(url, ssid)
{
    try
    {
        let stream = await new Promise(async (resolve, reject) =>
        {
            //  Gọi POST request để lấy html body 
            let body = await getThisWeekScheduleHTML(url, ssid);
            let $ = cheerio.load(body, {decodeEntities: false});


            //  Lấy học kỳ đang chọn
            let term = $('select[id="ctl00_ContentPlaceHolder_cboHocKy3"] option:selected').text();
            console.log('Selected term: ', term);


            let schedules = [];
            $('#detailTbl > tbody > tr:not(:first-child)').each(async(trIndex, tr) =>
            {
                let dateOfWeek = Math.floor(trIndex / 3);   //  ngày trong một tuần
                let dateSectionIndex = trIndex % 3; //  buổi trong một ngày
                // console.log(dateOfWeek, dateSectionIndex);

                switch (dateSectionIndex) {
                    case 0: {
                        schedules.push({
                            dayIndex: dateOfWeek,
                            morning: [],
                            afternoon: [],
                            evening: []
                        });

                        schedules[dateOfWeek].morning = await getSchedulesInSectionOfDate(tr);
                        break;
                    }

                    case 1: {
                        schedules[dateOfWeek].afternoon = await getSchedulesInSectionOfDate(tr);
                        break;
                    }

                    case 2: {
                        schedules[dateOfWeek].evening = await getSchedulesInSectionOfDate(tr);
                        break;
                    }
                }
            });


            resolve({term: term, schedule: schedules});
        });

        return stream;
    }
    catch (err)
    {
        console.log(`[testSchedule-viewer.js] — Error:`, err);
    }
}


async function getSchedulesInSectionOfDate(tr) {
    try {
        let $ = cheerio.load(tr, {decodeEntities: false});
        let classes = [];

        $('table.table-lich_hoc > tbody > tr').each(function(index, elem) {
            let subject_name = $(elem).find('td:nth-child(2)').text().trim().replace(/\n */gm, '');

            let trimmed_subject_name = subject_name.replace('(Môn học đã kết thúc)', '');


            let lastOpeningParenthesesIndex = trimmed_subject_name.lastIndexOf('(');
            let lastEndingParenthesesIndex = trimmed_subject_name.lastIndexOf(')');
            let type = trimmed_subject_name.substring(lastOpeningParenthesesIndex,
                lastEndingParenthesesIndex + 1);

            classes.push({
                class_id: $(elem).find('td:first-child').text().trim(),
                type: type.replace('(', '').replace(')', '').split(':')[0],
                completed: subject_name.includes('(Môn học đã kết thúc)')? true: false,
                subject_name: trimmed_subject_name.replace(type, ''),
                period: $(elem).find('td:nth-child(3)').text().trim(),
                teacher: $(elem).find('td:nth-child(4)').text().trim(),
                room: $(elem).find('td:nth-child(5)').text().trim(),
                date: $(elem).find('td:nth-child(6)').text().trim().replace(/\n */gm, '').split('Đến:')[1]
            });
        });


        return classes;
    }
    catch (error) {
        console.log(error);
    }
}


async function getThisWeekScheduleHTML(url, sessionId)
{
    try
    {
        if (url === undefined)
        {
            console.log('URL is undefined.');
            return {};
        }


        console.log('\n\nGetting test schedules - url: ' + url);
        let stream = await new Promise((resolve, reject) =>
        {
            request
            (
                {
                    method: 'GET',
                    strictSSL: false,
                    url: url,
                    headers: {
                        'Cookie': 'ASP.NET_SessionId=' + sessionId
                    }
                },
                (err, res, body) =>
                {
                    if (err || (res.statusCode !== 200))
                    {
                        console.log(`[normal-schedule-viewer.js:139] — Error:`, err);
                        return reject(err);
                    }
                    else
                    {
                        // console.log(body);
                        return resolve(body);
                    }
                }
            );
        });

        return stream;
    }
    catch (err)
    {
        console.log(`[normal-schedule-viewer.js] — Error:`, err);
    }
}
