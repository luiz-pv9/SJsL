;(function(SJsL) {

    String.prototype.isTypeOf = function(arg) {
    	
        return SJsL.typeOf(arg) === this.toLowerCase();
    }

})(window.SJsL);