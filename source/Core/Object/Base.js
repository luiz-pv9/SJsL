;(function(SJsL) {

	Object.prototype.keys = function(fn) {

		if('undefined'.isTypeOf(Object.keys)) {

			for(var prop in this) {

				fn(prop);
			}
		}
		return Object.keys(this);
	};

	Object.prototype.shallowClone = function() {

		return SJsL.shallowClone(this);
	}

	Object.prototype.deepClone = function() {

		return SJsL.deepClone(this);
	}

	Object.prototype.removeAttribute = function(attributeName) {

		delete this[attributeName];	
		return this;
	}

	Object.prototype.removeAttributes = function() {

		if('array'.isTypeOf(arguments[0])) {

			var self = this;
			arguments[0].each(function(attrName) {

				self.removeAttribute(attrName);
			});
		}
		else {

			for(var i = 0; i < arguments.length; i++) {

				this.removeAttribute(arguments[i]);
			}		
		}
	}

	Object.prototype.allowAttributes = function() {

		var allowedAttributes = [];
		var currentAttributes = this.keys();
		var self = this;
		if('array'.isTypeOf(arguments[0])) {

			arguments[0].each(function(attrName) {

				allowedAttributes.push(attrName);
			});
		}
		else {

			for(var i = 0; i < arguments.length; i++) {

				allowedAttributes.push(arguments[i]);
			}
		}
		currentAttributes.each(function(attr) {

			if(!allowedAttributes.contains(attr)) {

				self.removeAttribute(attr);
			}
		});
		return self;
	}

})(SJsL);