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
    'Exec filter': function (test) {
    // ============================================================================
        test.expect(1);
		
		var expected = [ json.store.book[0], json.store.book[1], json.store.book[2] ]
		
		var result = jsonpath({
			json:json,
			path:"$.store.book[?{\"price\":20}]",
			exec:function(arg, item){ return item.price < arg.price}
		});
		
        test.deepEqual(expected, result);

        test.done();
    },
	 // ============================================================================
    'Exec select': function (test) {
    // ============================================================================
        test.expect(1);
		
		var expected = [ "red" ]
       
        var result = jsonpath({
			json: json,
			path: '$.store.bicycle[{"prop":"color"}]', 
			exec:function(arg){ return arg.prop; }
		});
		
        test.deepEqual(expected, result);

        test.done();
    },
	 // ============================================================================
    'Exec as argument': function (test) {
    // ============================================================================
        test.expect(1);
		
		var expected = [ "red" ]
       
		var result = jsonpath({json: json, path: '$.store.bicycle[{"prop":"color"}]'}, null, null, null, null, function(arg){ return arg.prop; });
		
        test.deepEqual(expected, result);

        test.done();
    },
	 // ============================================================================
    'Exec throws when callback not supplied': function (test) {
    // ============================================================================
        test.expect(1);
       
		var foundMessage;
		
		 try{
			jsonpath({json: json, path: '$.store.bicycle[{"prop":"color"}]'});
		 }
		 catch(e){
			foundMessage = e.message;
		 }

		 test.equal(foundMessage, "No callback for exec parameter.");

         test.done();
    }
});
}());
