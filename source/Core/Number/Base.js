;(function(SJsL) {

	Number.prototype.times = function(fn) {

		for(var i = 0; i < this; i++) {

			fn(i);	
		}
	}

	Number.prototype.upTo = function(end, fn) {

		var list = [];
		for(var i = this; i < end; i++) {

			list.push(i);
		}
		return list;
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