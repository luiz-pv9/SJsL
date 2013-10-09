;(function(SJsL) {

	Number.prototype.times = function(fn) {

		for(var i = 0; i < this; i++) {

			fn(i);	
		}
	}

	Number.prototype.upTo = function(end, fn) {

		for(var i = this; i < end; i++) {

			fn(i);
		}
	}

	Number.prototype.range = function() {

		var array = [];
		for(var i = 0; i < this; i++) {

			array.push(i);
		}
		return array;
	}

	Number.prototype.toString = function(prefix) {
		
		prefix = prefix || '';
		return prefix + this;
	};

})(SJsL);