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

})(SJsL);