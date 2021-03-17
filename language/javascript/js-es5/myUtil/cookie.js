var cookieRender = (function() {
    function setValue(options) {
        var _default = {
            name: null,
            value: null,
            expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24)),
            path: '/',
            domain: ''
        };
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }
        // encodeURI，encodeURIComponent主要用于中文编码
        document.cookie = _default.name + "=" + encodeURI(_default.value) +
            ";expires=" + _default.expires + ";path=" + _default.path + ";domain=" + _default.domain;
    }

    function getValue(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return decodeURI(arr[2]);
        }
        return null;
    }

    function removeValue(options) {
        var _default = {
            name: null,
            path: '/',
            domain: ''
        };
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }
        if (getValue(_default.name)) {
            document.cookie = _default.name + "=;path=" + _default.path +
                ";domain=" + _default.domain + ";expires=Fri, 02 Jan 1970 00:00:01 GMT";
        }
    }
    return {
        set: setValue,
        get: getValue,
        remove: removeValue
    }
})();

// 学习
// var cookie = {
//     set: function(name, value, expires, path, domain) {
//         expires = expires || new Date(new Date().getTime() + (1000 * 60 * 60 * 24));
//         // decodeURI，encodeURI:空格, decodeURIComponent，encodeURIComponent:空格,:,/等
//         document.cookie = name + "=" + encodeURI(value) +
//             ((expires) ? ";expires=" + expires.toUTCString() : "") +
//             ((path) ? ";path=" + path : ";path=/") +
//             ((domain) ? ";domain=" + domain : "");

//     },
//     get: function(name) {
//         // [^1]: 非1！！！
//         var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
//         if (arr != null) {
//             return decodeURI(arr[2]);
//         }
//         return null;
//     },
//     remove: function(name, path, domain) {
//         if (this.get(name)) {
//             document.cookie = name + "=" + encodeURI(value) +
//                 ";expires=Fri, 02 Jan 1970 00:00:01 GMT" +
//                 ((path) ? ";path=" + path : ";path=/") +
//                 ((domain) ? ";domain=" + domain : "");
//         }
//     }
// }