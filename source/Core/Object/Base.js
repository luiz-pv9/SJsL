;(function(SJsL) {

	SJsL.O = {};
	var O = SJsL.O;
	var A = SJsL.A;

	O.keys = function(obj) {

		if(SJsL.isUndefined(Object.keys)) {

			var keys = [];
			for(var prop in obj) {

				keys.push(prop);
			}
			return keys;
		}
		return Object.keys(obj);
	};

	O.eachKey = function(obj, fn) {

		A.each(O.keys(obj), fn);
	}

	O.eachKeyValue = function(obj, fn) {

		A.each(O.keys(obj), function(key) {

			fn(key, obj[key]);
		});
	}

	O.removeAttribute = function(object, attributeName) {

		delete object[attributeName];	
		return object;
	}

	O.removeAttributes = function() {

		var obj = arguments[0];
		if(SJsL.isArray(arguments[1])) {

			var self = this;
			A.each(arguments[1], function(attrName) {

				O.removeAttribute(obj, attrName);
			});
		}
		else {

			for(var i = 1; i < arguments.length; i++) {

				O.removeAttribute(obj, arguments[i]);
			}		
		}
	}

	O.allowAttributes = function() {

		var obj = arguments[0];
		var allowedAttributes = [];
		var currentAttributes = O.keys(obj);
		var self = this;
		if(SJsL.isArray(arguments[1])) {

			A.each(arguments[1], function(attrName) {

				allowedAttributes.push(attrName);
			});
		}
		else {

			for(var i = 1; i < arguments.length; i++) {

				allowedAttributes.push(arguments[i]);
			}
		}
		A.each(currentAttributes, function(attr) {

			if(!A.contains(allowedAttributes, attr)) {

				O.removeAttribute(obj, attr);
			}
		});
		return self;
	}

})(SJsL);