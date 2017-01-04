/*global require, module*/
/*eslint-disable quotes*/
(function () {'use strict';

var jsonpath = require('../'),
    testCase = require('nodeunit').testCase;

var json = {
    "store": {
        "book": { "category": "reference",
            "author": "Nigel Rees",
            "title": "Sayings of the Century",
            "price": [8.95, 8.94, 8.93]
        },
        "books": [
            { "category": "reference",
                "author": "Nigel Rees",
                "title": "Sayings of the Century",
                "price": [8.95, 8.94, 8.93]
            }
        ]
    }
};

module.exports = testCase({
    'get single': function (test) {
        var expected = json.store.book;
        var result = jsonpath({json: json, path: 'store.book', flatten: true, wrap: false});
        test.deepEqual(expected, result);
        test.done();
    },

    'get arr': function (test) {
        var expected = json.store.books;
        var result = jsonpath({json: json, path: 'store.books', flatten: true, wrap: false});
        test.deepEqual(expected, result);
        test.done();
    },

	'get reverse arr': function (test) {
        var expected = [8.93, 8.94, 8.95];
        var result = jsonpath({ json: json, path: 'store.book.price[::-1]', flatten: true, wrap: false });
        test.deepEqual(expected, result);
        test.done();
    }
});
}());
