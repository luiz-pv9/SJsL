;(function(SJsL) {

	SJsL.typeOf = function(e) {

	    return Object.prototype.toString.call(e).replace("[object ", "").replace("]", "").toLowerCase();
	}
	
})(window.SJsL);

