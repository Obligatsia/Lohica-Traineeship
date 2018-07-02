const $ = require ("jquery");


module.exports = class SendRequest {
    static sendForRegistration(url, method, data, successFunc, btnGroup, form, props) {
        $.ajax({
            url,
            method,
            data,
            contentType: false,
            processData: false,
            success: function (newData) {
                successFunc(newData, btnGroup, form, props)
            },
            error: ((data) => {
                console.log(data.status + ': ' + data.statusText);
            })
        });
    }

    static sendForLogIn(url, method, data, successFunc, btnGroup, props, toggleClasses) {
        $.ajax({
            url,
            method,
            data,
            contentType: 'application/json; charset=utf-8',
            success: function (newData) {
                successFunc(newData, btnGroup, props, toggleClasses)
            },
            error: ((data) => {
                console.log(data.status + ': ' + data.statusText);
            })
        });
    }
};