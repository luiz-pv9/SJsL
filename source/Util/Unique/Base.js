;(function(SJsL) {

	SJsL._id = 0;

	SJsL.generateId = function(prefix) {
		prefix = prefix || "";
		return prefix + (++SJsL._id);
	}

})(window.SJsL);

