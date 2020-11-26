const cheerio = require('cheerio');
const Page = require('./Page');
const link = 'https://sinhvien.bvu.edu.vn/HoSoSinhVien.aspx';


class HoSoSinhVien extends Page
{
    static getRawHTML(sessionId)
    {
        return super.getRawHTML(link, sessionId);
    }

    static async getProfile(sessionId)
    {
        let self = this;
        return new Promise( async(resolve, reject) =>
        {
            await this.getRawHTML(sessionId)
                .catch(err => {
                    return resolve('null');
                })
                .then(html =>
                    {
                        if (html === undefined)
                        {
                            return resolve('null');
                        }

                        const $ = cheerio.load(html);
                        let profile = {};
                        profile.name = self.getName($);
                        profile.learningStatus = self.getLearningStatus($);
                        profile.personalProfile = self.getPersonalProfile($);
                        profile.familyProfile = self.getFamilyProfile($);

                        return resolve(profile.name === ''? 'null': profile);
                    });
        });
    }


    static getName($)
    {
        return $('#ctl00_ucRight1_Span2').text().replace(/(  )*/gm, '').replace(/\n/gm, '');
    }

    static getLearningStatus($$)
    {
        let profile = {};
        let $ = cheerio.load($$.html(), {decodeEntities: false});
        $('.main-content >.body-group').each((index, elem) =>
        {
            if (index === 0)
            {
                $(elem).find('.group-right >table.none-grid >tbody >tr').each((index, elem) =>
                {
                    let firstChild = $(elem).find('>td').first().text().replace(/(  )*/gm, '').replace(/\n/gm, '').split(':')[1];
                    let secondChild = $(elem).find('>td').last().text().replace(/(  )*/gm, '').replace(/\n/gm, '').split(':')[1];


                    switch (index)
                    {
                        case 0:
                            {
                                profile.status = $(elem).find('>td >span').first().text();
                                break;
                            }
                        case 1:
                            {
                                profile.session = firstChild;
                                profile.gender = secondChild;
                                break;
                            }
                        case 2:
                            {
                                profile.educatingRank = firstChild;
                                profile.educatingType = secondChild;
                                break;
                            }
                        case 3:
                            {
                                profile.major = firstChild;
                                profile.mainMajor = secondChild;
                                break;
                            }
                        case 4:
                            {
                                profile.department = firstChild;
                                profile.class = secondChild;
                                break;
                            }
                        case 5:
                            {
                                profile.position = firstChild;
                                profile.youthActivity = secondChild;
                                break;
                            }
                    }
                });
            }
        });


        return profile;
    }

    static getPersonalProfile($$)
    {
        let profile = {};
        let pid = {};
        let birth = {};
        let prioritize = {};
        let nationality = {};
        let contact = {};
        let bvu365 = {};
        let address = {};
        let gang = {};

        profile.birth = birth;
        profile.pid = pid;
        profile.prioritize = prioritize;
        profile.nationality = nationality;
        profile.contact = contact;  contact.address = address;
        profile.bvu365 = bvu365;
        profile.gang = gang;



        let $ = cheerio.load($$.html(), {decodeEntities: false});
        $('.main-content >.body-group').each((index, elem) =>
        {
            if (index === 1)
            {
                $(elem).find('>table.none-grid >tbody >tr').each((index, elem) =>
                {
                    let firstChild = $(elem).find('>td').first().text().replace(/(  )*/gm, '').replace(/\n/gm, '').split(':')[1];
                    let secondChild = $(elem).find('>td').last().text().replace(/(  )*/gm, '').replace(/\n/gm, '').split(':')[1];


                    switch (index)
                    {
                        case 0:
                            {
                                birth.date = firstChild;
                                birth.place = secondChild;
                                break;
                            }
                        case 1:
                            {
                                nationality.nation = firstChild;
                                nationality.religion = secondChild;
                                break;
                            }
                        case 2:
                            {
                                prioritize.region = firstChild;
                                pid.number = secondChild;
                                break;
                            }
                        case 3:
                            {
                                prioritize.object = firstChild;
                                pid.issueDate = secondChild;
                                break;
                            }
                        case 4:
                            {
                                prioritize.policyArea = firstChild;
                                pid.issuePlace = secondChild;
                                break;
                            }
                        case 5:
                            {
                                gang.dateOfDelegation = firstChild;
                                gang.dateOfParty = secondChild;
                                break;
                            }
                        case 6:
                            {
                                contact.phone = firstChild;
                                contact.email = secondChild;
                                break;
                            }
                        case 7:
                            {
                                bvu365.mail = firstChild;
                                bvu365.password = secondChild;
                                break;
                            }
                        case 8:
                            {
                                contact._2ndPhone = firstChild;
                                contact._3rdPhone = secondChild;
                                break;
                            }
                        case 9:
                            {
                                address.houseHold = firstChild.split('. ').join('');
                                break;
                            }
                        case 10:
                            {
                                address.contacting = firstChild;
                                break;
                            }
                    }
                });
            }
        });


        return profile;
    }

    static getFamilyProfile($$)
    {
        let profile = [];


        let $ = cheerio.load($$.html(), {decodeEntities: false});
        $('.main-content >.body-group').each((index, elem) =>
        {
            if (index === 2)
            {
                let tempPersion = {};
                $(elem).find('>table.none-grid >tbody >tr').each((index, elem) =>
                {
                    let firstChild = $(elem).find('>td').first().text().replace(/(  )*/gm, '').replace(/\n/gm, '').split(':')[1];
                    let secondChild = $(elem).find('>td').last().text().replace(/(  )*/gm, '').replace(/\n/gm, '').split(':')[1];


                    switch (index % 3)
                    {
                        case 0:
                            {
                                tempPersion.name = firstChild;
                                tempPersion.relation = secondChild;
                                break;
                            }
                        case 1:
                            {
                                tempPersion.dob = firstChild;
                                tempPersion.nationality = secondChild;
                                break;
                            }
                        case 2:
                            {
                                tempPersion.job = firstChild;
                                tempPersion.phone = secondChild;
                                profile.push(tempPersion);
                                tempPersion = {};

                                break;
                            }
                    }
                });
            }
        });


        return profile;
    }
}


module.exports = HoSoSinhVien;
