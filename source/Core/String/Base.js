;(function(SJsL) {

    String.prototype.isTypeOf = function(arg) {
    	
        return SJsL.typeOf(arg) === this.toLowerCase();
    }

    String.prototype.each = function(fn) {

    	for(var i = 0; i < this.length; i++) {

    		fn(this.charAt(i));
    	}
    }

})(window.SJsL);