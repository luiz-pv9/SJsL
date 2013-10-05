;(function(SJsL) {

	SJsL.runOnce = function(fn) {

		var i = 0;
		return function() {

			if(i++ === 0) {

				fn();
			}
		}
	}

})(window.SJsL);