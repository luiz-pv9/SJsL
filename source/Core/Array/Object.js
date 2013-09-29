;(function(SJsL) {
	'use strict';

	// --
	// All those functions work as an array of objects
	// --

	// Given an attribute, returns an array with all the values extracted from the objects
	Array.prototype.pluck = function(attr) {
		return this.map(function(e) {
			return e[attr];
		});
	}

	// For each element in the array, the function passed is called and the return value
	// for that function is sotered in another array, and the new array is returned
	Array.prototype.map = function(fn) {
		var list = [];
		this.each(function(e) {
			list.push(fn(e));
		})
		return list;
	}

	Array.prototype.foldLeft = function(fn, memo) {
		this.each(function(e) {
			memo = fn(memo, e);
		});
		return memo;
	}

	Array.prototype.reduce = Array.prototype.foldLeft;

	Array.prototype.filter = function(fn) {
		var list = [];
		this.each(function(e) {
			if(fn(e)) {
				list.push(e);
			}
		});
		return list;
	}

	Array.prototype.filter = Array.prototype.search;

	Array.prototype.outNested = function(attr) {
		var obj = {};
		this.pluck(attr).each(function(att) {
			obj[att] = [];
		})
		this.each(function(e) {
			obj[e[attr]].push(e);
		})
		return obj;
	}

})(window.SJsL);