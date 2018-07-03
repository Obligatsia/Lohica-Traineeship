const $ = require ("jquery");
const {friends, news, main, search, settings } = require ('../constants');


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

    static sendForEdition(url, method, data, successFunc, props) {
        $.ajax({
            url,
            method,
            data,
            contentType: false,
            processData: false,
            success: function (newData) {
                successFunc(newData, props)
            },
            error: ((data) => {
                console.log(data.status + ': ' + data.statusText);
            })
        });
    }


    static sendForLogIn(url, method, data, successFunc, btnGroup, props, toggleClasses, user, saveToLocalStorage) {
        $.ajax({
            url,
            method,
            data,
            contentType: 'application/json; charset=utf-8',
            success: function (newData) {
                successFunc(newData, btnGroup, props, toggleClasses, user, saveToLocalStorage)
            },
            error: ((data) => {
                console.log(data.status + ': ' + data.statusText);
            })
        });
    }

    static sendForFriends(url, method, user, props){
        $.ajax({
            url,
            method,
            headers: {"Authorization": `Bearer ${user.token}`},
            success: ((data)=>{
                props.history.push(friends);
            }),
            error:((data)=>{
                console.log(data);

            })
        });
    }

    static sendForNews(url, method, user, props){
        $.ajax({
            url,
            method,
            headers: {"Authorization": `Bearer ${user.token}`},
            success: ((data)=>{
                props.history.push(news);
            }),
            error:((data)=>{
                console.log(data);

            })
        });
    }

    static sendForMain(url, method, user, props){
        $.ajax({
            url,
            method,
            headers: {"Authorization": `Bearer ${user.token}`},
            success: ((data)=>{
                props.history.push(main);

            }),
            error:((data)=>{
                console.log(data);

            })
        });
    }

    static sendForSearch(url, method, user, props){
        $.ajax({
            url,
            method,
            headers: {"Authorization": `Bearer ${user.token}`},
            success: ((data)=>{
                props.history.push(search);

            }),
            error:((data)=>{
                console.log(data);

            })
        });
    }

    static sendForSettings(url, method, user, props){
        $.ajax({
            url,
            method,
            headers: {"Authorization": `Bearer ${user.token}`},
            success: ((data)=>{
                props.history.push(settings);

            }),
            error:((data)=>{
                console.log(data);

            })
        });
    }
};