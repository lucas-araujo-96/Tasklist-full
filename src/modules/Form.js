const path = require(`path`);
const userModel = require(path.join(__dirname, `..`, `models`, `userModel`));


module.exports = class Form{
    constructor() {};

    static validatePassword(pass, conf) {
        const length = (pass.trim().length >= 6 && pass.trim().length <= 16);
        const confirmation = (pass === conf);
        return (length && confirmation);
    };

    static validateName(name) {
        if (name.replace(` `, ``).length < 2) return false;
        return (name.length === name.trim().length);
    };

    static async validateEmail(email) {
        const mailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!mailTest.test(email)) return false;
        const query = await userModel.findOne({email: email});
        return (query===null);
    };

    static async validateNewEmail(id, newValue) {
        const mailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!mailTest.test(newValue)) return false;
        const query = await userModel.findOne({email: newValue, _id: {$ne: id}});
        return (query===null);
    };

    static async validateUsername(username) {
        if (username.length < 6) return false;
        const query = await userModel.findOne({username: username});
        return (query===null);
    };

    static async validateNewUsername(id, newValue) {
        if (newValue.length < 6) return false;
        const query = await userModel.findOne({username: newValue, _id: {$ne: id}});
        return (query===null);
    };
};

    

    

    

    