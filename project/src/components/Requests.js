const $ = require ("jquery");

module.exports = class AjaxRequest {
    static sendRequest(url, method, data, contentType, processData, token, successFunc, ...args) {
        $.ajax({
            url,
            method,
            data,
            contentType,
            processData,
            headers: {"Authorization": `Bearer ${token}`},
            success: function (newData) {
                successFunc(newData, ...args)
            },
            error: ((data) => {
                console.log(data.status + ': ' + data.statusText);
            })
        });
    }
};