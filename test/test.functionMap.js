/*global require, module*/
/*eslint-disable quotes*/
(function () {'use strict';

var jsonpath = require('../'),
    testCase = require('nodeunit').testCase;

var json = {"store": {
    "book": [
      { "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      { "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      { "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      { "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
};

module.exports = testCase({

    // ============================================================================
    'FunctionMap filter': function (test) {
    // ============================================================================
        test.expect(1);
		
		var expected = [ json.store.book[0], json.store.book[1], json.store.book[2] ]
		
		var booksLessThan20 = function(item){return item.price < 20};
       
        var result = jsonpath({json: json, path: '$.store.book[?{lessThan20}]', functionMap:{lessThan20: booksLessThan20}});
		
        test.deepEqual(expected, result);

        test.done();
    },
	 // ============================================================================
    'FunctionMap select': function (test) {
    // ============================================================================
        test.expect(1);
		
		var expected = [ "red" ]
		
		var color = function(item){return "color"};
       
        var result = jsonpath({json: json, path: '$.store.bicycle[{getColor}]', functionMap:{getColor: color}});
		
        test.deepEqual(expected, result);

        test.done();
    },
	 // ============================================================================
    'FunctionMap as argument': function (test) {
    // ============================================================================
        test.expect(1);
		
		var expected = [ "red" ]
		
		var color = function(item){return "color"};
       
		var result = jsonpath({json: json, path: '$.store.bicycle[{getColor}]'}, null, null, null, null, {getColor: color});
		
        test.deepEqual(expected, result);

        test.done();
    },
	 // ============================================================================
    'FunctionMap throws': function (test) {
    // ============================================================================
        test.expect(1);
       
		test.throws(
			function(){jsonpath({json: json, path: '$.store.bicycle[{getColor}]'});});

        test.done();
    }
});
}());
