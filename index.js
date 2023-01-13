/**
 * Copyright (c) 2023 bmcyver
 * 
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 */

(function() {
    function naver() {
        this.ClientId = null;
        this.ClientSecret = null;
        this.initialized = false;
    };

    naver.prototype = {};
    naver.prototype.init = function (ClientId, ClientSecret) {
        if (typeof ClientId != 'string') throw new TypeError('Client Id must be string.');
        if (typeof ClientSecret != 'string') throw new TypeError('Client Secret must be string.');
        this.ClientId = ClientId;
        this.ClientSecret = ClientSecret;
        this.initialized = true;
    };

    function _request (url, ClientId, ClientSecret, method) {
        const res = org.jsoup.Jsoup.connect('https://openapi.naver.com/' + url)
        .header('X-Naver-Client-Id', ClientId)
        .header('X-Naver-Client-Secret', ClientSecret)
        .ignoreContentType(true)
        .ignoreHttpErrors(true)
        .method(method ? org.jsoup.Connection.Method.POST : org.jsoup.Connection.Method.GET)
        .execute();

        if (res.statusCode() === 400) throw new Error('Bad Request[400], Check request parameters.')
        if (res.statusCode() === 401) throw new Error('Unauthorized[401], Check your Client Id and Client Secret.');
        if (res.statusCode() === 403) throw new Error('Forbidden[403], Check request parameters.')
        if (res.statusCode() === 429) throw new Error('Too Many Requests[429], Check your API rate limit.');
        if (res.statusCode() === 500) throw new Error('Internal Server Error[500], Check request parameters.');
        if (res.statusCode() !== 200) throw new Error('unexpected error ' + res.statusCode());
        return JSON.parse(res.parse().text().replace(/"/g, '\"').replace(/'/g, '\''));
    }
    naver.prototype.shortURL = function (url, extra) {
        if (typeof url != 'string') throw new TypeError('url must be string');
        const res = _request('v1/util/shorturl?url=' + url, this.ClientId, this.ClientSecret);
        return extra ? JSON.stringify(res.result) : res.result.url;
    }
    naver.prototype.translation = function (source, target, text, extra) {
        if (typeof (source && target && text) != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/papago/n2mt?source=' + source + '&target=' + target + '&text=' + text, this.ClientId, this.ClientSecret, true);
        return extra ? JSON.stringify(res.message.result) : res.message.result.translatedText;
    }
    naver.prototype.detectLangs = function (text) {
        if (typeof text != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/papago/detectLangs?query=' + text, this.ClientId, this.ClientSecret, true);
        return res.langCode;
    }
    naver.prototype.romanization = function (text, extra) {
        if (typeof text != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/krdict/romanization?query=' + text, this.ClientId, this.ClientSecret);
        if (res.aResult[0] == undefined) return 'Failed to romanize text';
        return extra ? res.aResult[0] : res.aResult[0].aItems.map(a => a.name).join;
    }
    naver.prototype.searchBlog = function (query, display, extra) {
        if (typeof query != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/search/blog.json?query=' + (java.net.URLEncoder.encode(query, "UTF-8")) + "&display=" + (display ? display : '10'), this.ClientId, this.ClientSecret);
        return extra ? JSON.stringify(res).replace(/<\/b>/g, '') : JSON.stringify(res.items).replace(/<\/b>/g, '');
    }
    naver.prototype.searchBook = function (query, display, extra) {
        if (typeof query != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/search/book.json?query=' + (java.net.URLEncoder.encode(query, "UTF-8")) + "&display=" + (display ? display : '10'), this.ClientId, this.ClientSecret);
        return extra ? JSON.stringify(res).replace(/<\/b>/g, '') : JSON.stringify(res.items).replace(/<\/b>/g, '');
    }
    naver.prototype.searchAdult = function (query) {
        if (typeof query != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/search/adult.json?query=' + (java.net.URLEncoder.encode(query, "UTF-8")), this.ClientId, this.ClientSecret);
        return res.adult == 0 ? "일반 검색어" : "성인 검색어";
    }
    naver.prototype.searchEncyc = function (query, display, extra) {
        if (typeof query != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/search/encyc.json?query=' + (java.net.URLEncoder.encode(query, "UTF-8")) + "&display=" + (display ? display : '10'), this.ClientId, this.ClientSecret);
        return extra ? JSON.stringify(res).replace(/<\/b>/g, '') : JSON.stringify(res.items).replace(/<\/b>/g, '');
    }
    naver.prototype.searchMovie = function (query, display, extra) {
        if (typeof query != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/search/movie.json?query=' + (java.net.URLEncoder.encode(query, "UTF-8")) + "&display=" + (display ? display : '10'), this.ClientId, this.ClientSecret);
        return extra ? JSON.stringify(res).replace(/<\/b>/g, '') : JSON.stringify(res.items).replace(/<\/b>/g, '');
    }
    naver.prototype.searchCafeArticle = function (query, display, extra) {
        if (typeof query != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/search/cafearticle.json?query=' + (java.net.URLEncoder.encode(query, "UTF-8")) + "&display=" + (display ? display : '10'), this.ClientId, this.ClientSecret);
        return extra ? JSON.stringify(res).replace(/<\/b>/g, '') : JSON.stringify(res.items).replace(/<\/b>/g, '');
    }
    naver.prototype.searchKin = function (query, display, extra) {
        if (typeof query != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/search/kin.json?query=' + (java.net.URLEncoder.encode(query, "UTF-8")) + "&display=" + (display ? display : '10'), this.ClientId, this.ClientSecret);
        return extra ? JSON.stringify(res).replace(/<\/b>/g, '') : JSON.stringify(res.items).replace(/<\/b>/g, '');
    }
    naver.prototype.searchLocal = function (query, display, extra) {
        if (typeof query != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/search/local.json?query=' + (java.net.URLEncoder.encode(query, "UTF-8")) + "&display=" + (display ? display : '10'), this.ClientId, this.ClientSecret);
        return extra ? JSON.stringify(res).replace(/<\/b>/g, '') : JSON.stringify(res.items).replace(/<\/b>/g, '');
    }
    naver.prototype.searchErrata = function (query) {
        if (typeof query != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/search/errata.json?query=' + (java.net.URLEncoder.encode(query, "UTF-8")), this.ClientId, this.ClientSecret);
        return res.errata ? res.errata : '변환된 결과가 없습니다.';
    }
    naver.prototype.searchWebkr = function (query, display, extra) {
        if (typeof query != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/search/Webkr.json?query=' + (java.net.URLEncoder.encode(query, "UTF-8")) + "&display=" + (display ? display : '10'), this.ClientId, this.ClientSecret);
        return extra ? JSON.stringify(res).replace(/<\/b>/g, '') : JSON.stringify(res.items).replace(/<\/b>/g, '');
    }
    naver.prototype.searchShop = function (query, display, extra) {
        if (typeof query != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/search/shop.json?query=' + (java.net.URLEncoder.encode(query, "UTF-8")) + "&display=" + (display ? display : '10'), this.ClientId, this.ClientSecret);
        return extra ? JSON.stringify(res).replace(/<\/b>/g, '') : JSON.stringify(res.items).replace(/<\/b>/g, '');
    }
    naver.prototype.searchImage = function (query, display, extra) {
        if (typeof query != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/search/image.json?query=' + (java.net.URLEncoder.encode(query, "UTF-8")) + "&display=" + (display ? display : '10'), this.ClientId, this.ClientSecret);
        return extra ? JSON.stringify(res).replace(/<\/b>/g, '') : JSON.stringify(res.items).replace(/<\/b>/g, '');
    }
    naver.prototype.searchDoc = function (query, display, extra) {
        if (typeof query != 'string') throw new TypeError('parameters must be string');
        const res = _request('v1/search/doc.json?query=' + (java.net.URLEncoder.encode(query, "UTF-8")) + "&display=" + (display ? display : '10'), this.ClientId, this.ClientSecret);
        return extra ? JSON.stringify(res).replace(/<\/b>/g, '') : JSON.stringify(res.items).replace(/<\/b>/g, '');
    }
    module.exports = naver;
})();
