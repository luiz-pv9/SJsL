SJsL = SJsL || {};

SJsL.typeOf = function(e) {
	return Object.prototype.toString.call(e).replace("[object ", "").replace("]", "");
}