'use strict';

var requester = function() {

    function send(method, url, options) {
        options = options || {};

        var headers = options.headers || {},
            data = options.data || undefined;

        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                method: method,
                async: true,
                contentType: 'application/json',
                headers: headers,
                data: JSON.stringify(data),
                success: function success(res) {
                    resolve(res);
                },
                error: function error(err) {
                    reject(err);
                }
            });
        });
        return promise;
    }

    function get(url, options) {
        return send('GET', url, options);
    }

    function post(url, options) {
        return send('POST', url, options);
    }

    function put(url, options) {
        return send('PUT', url, options);
    }

    function del(url, options) {
        return send('POST', url, options);
    }

    return {
        send: send,
        get: get,
        post: post,
        put: put,
        delete: del
    };
}();