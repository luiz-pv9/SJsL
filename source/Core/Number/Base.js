;(function(SJsL) {

	SJsL.N = {};
	var N = SJsL.N;

	N.times = function(num, fn) {

		for(var i = 0; i < num; i++) {

			fn(i);	
		}
	}

	N.upTo = function(num, end) {

		var list = [];
		for(var i = num; i < end; i++) {

			list.push(i);
		}
		return list;
	}

	N.range = function(num) {

		return N.upTo(0, num);
	}

	N.toString = function(num, prefix) {
		
		prefix = prefix || '';
		return prefix + num;
	};

})(SJsL);