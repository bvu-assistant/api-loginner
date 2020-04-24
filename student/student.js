const password_encryptor = require('../self_modules/encrypt-password');
const logOutner = require('../self_modules/logOutner');
const logInner = require('../self_modules/logInner');

const request = require('request');
const cheerio = require('cheerio');



class Student
{
    constructor(id, password)
    {
        this.id = id;
        this.password = password;
        this.sessionId = undefined;
        this.pages = require('./pages/collection');
    }


    async logIn()   //  returns undefined if error
    {
        let loginResponse = await logInner.login(this.id, this.password);
        console.log(loginResponse);


        if (loginResponse)
        {
            if (loginResponse.isLoginSuccess)
            {
                this.sessionId = loginResponse.sessionId;
                return true;
            }
        }


        return false
    }

    logOut()
    {
        // logOutner.logOut()
    }

}

module.exports = Student;