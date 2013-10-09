;(function(SJsL) {
	'use strict';

	Array.prototype.average = function() {

		return this.sum() / this.length;
	}


	Array.prototype.sum = function() {

		return this.reduce(function(memo, val) {

			return memo + (+val || 0);
		}, 0);
	}

	Array.prototype.product = function() {

		return this.reduce(function(memo, val) {
			
			return memo * val;
		}, 1);
	}	

	Array.prototype.max = function() {
		if(this.length === 0) return void 0;
		if(this.length === 1) return this.head;

		return this.reduce(function(a, b) { return b > a ? b : a }, this.head());
	}

	Array.prototype.min = function() {
		if(this.length === 0) return void 0;
		if(this.length === 1) return this.head;

		return this.reduce(function(a, b) { return b > a ? a : b }, this.head());
	}

})(SJsL);