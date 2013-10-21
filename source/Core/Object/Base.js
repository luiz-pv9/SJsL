;(function(SJsL) {

	SJsL.keys = function(obj) {

		if('undefined'.isTypeOf(Object.keys)) {

			var keys = [];
			for(var prop in obj) {

				keys.push(prop);
			}
			return keys;
		}
		return Object.keys(obj);
	};

	SJsL.removeAttribute = function(object, attributeName) {

		delete object[attributeName];	
		return object;
	}

	SJsL.removeAttributes = function() {

		var obj = arguments[0];
		if('array'.isTypeOf(arguments[1])) {

			var self = this;
			arguments[1].each(function(attrName) {

				SJsL.removeAttribute(obj, attrName);
			});
		}
		else {

			for(var i = 1; i < arguments.length; i++) {

				SJsL.removeAttribute(obj, arguments[i]);
			}		
		}
	}

	SJsL.allowAttributes = function() {

		var obj = arguments[0];
		var allowedAttributes = [];
		var currentAttributes = SJsL.keys(obj);
		var self = this;
		if('array'.isTypeOf(arguments[1])) {

			arguments[1].each(function(attrName) {

				allowedAttributes.push(attrName);
			});
		}
		else {

			for(var i = 1; i < arguments.length; i++) {

				allowedAttributes.push(arguments[i]);
			}
		}
		currentAttributes.each(function(attr) {

			if(!allowedAttributes.contains(attr)) {

				SJsL.removeAttribute(obj, attr);
			}
		});
		return self;
	}

})(SJsL);