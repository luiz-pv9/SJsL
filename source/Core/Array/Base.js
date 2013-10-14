;(function(SJsL) {
	'use strict';

	// Implementing the indexOf function if it doesn't exists
	// Comparision happens with triple equal sign
	// Returns -1 if it doesn't find the element
	if('undefined'.isTypeOf([].indexOf)) {

		Array.prototype.indexOf = function(e) {
			for(var i=0, len=this.length; i<len; i++) {

				if(this[i] === e) return i;
			}
			return -1;
		}
	}

	// Returns true if the element is in the array, false otherwise
	Array.prototype.contains = function(e) {

		return this.indexOf(e) !== -1;
	}


	Array.prototype.remove = function(e) {

		if(this.contains(e)) {
			this.splice(this.indexOf(e), 1); 	
		}
		return this;
	}

	Array.prototype.removeAll = function(e) {

		while(this.contains(e)) {

			this.remove(e);
		}
		return this;
	}

	// Returns a new array with only the unique elements in this array
	// If sorted is passed, a much faster algorith runs.
	Array.prototype.unique = function(sorted) {

		var list = [];
		if(sorted) {

			this.each(function(e) {

				if(list.last() !== e) { list.push(e); }
			});
		}
		else {

			this.each(function(e) {

				if(!list.contains(e)) { list.push(e); }
			});
		}
		return list;
	}

	// Adds the element in the array if it doesn't already belongs to it
	Array.prototype.addUnique = function(e) {

		if(!this.contains(e)) this.push(e);
		return this;
	}

	Array.prototype.quickSort = function() {
		// TODO
	}

	// Returns the last element from the array and remove it
	Array.prototype.pop = function() {

		return this.splice(this.length-1, 1)[0];
	}

	Array.prototype.drop = Array.prototype.pop;

	// For each element in the array, calls the function passed with the next element
	Array.prototype.each = function(fn) {

		for(var i=0, len=this.length; i<len; i++) {

			fn(this[i]);
		}
	}

	// Same as each, but calls the function with a second parameter - the index of the element
	Array.prototype.eachWithIndex = function(fn) {

		for(var i=0, len=this.length; i<len; i++) {

			fn(this[i], i);
		}
	}

	// Returns the lsat element in the array
	Array.prototype.last = function() {
		if(this.length === 0) return void 0;
		return this[this.length-1];
	}



	// Given an array with N elements, this function returns the last N-1 elements
	Array.prototype.tail = function() {

		if(this.length === 0) return [];
		if(this.length === 1) return this.slice(1);
		return this.slice(1, this.length);
	}

	// Returns the first element
	Array.prototype.head = function() {

		if(this.length === 0) return void 0;
		return this[0];
	}

	Array.prototype.first = Array.prototype.head;

	Array.prototype.subArray = function(start, end) {

		var subArray = [];
		if(!end) {

			end = start;
			start = 0;
		}

		for(; start <= end; start++) {

			subArray.push(this[start]);
		}

		return subArray;
	}

	Array.prototype.offsetLeft = function(offset) {

		return this.subArray(offset, this.length);
	}

	Array.prototype.offsetRight = function(offset) {

		return this.subArray(0, (this.length - 1) - offset);
	}

	Array.prototype.offsetBottom = Array.prototype.offsetRight;
	Array.prototype.offsetTop = Array.prototype.offsetLeft;

	Array.prototype.insertAt = function(index, e) {

		this.splice(index, 0, e);
		return this;
	}

	Array.prototype.unshift = function(e) {

		return this.insertAt(0, e);
	}

	Array.prototype.reverse = function() {

		return this.reduce(function(memo, val) {
			
			return memo.unshift(val);
		}, []);
	}

	Array.prototype.shallowClone = function() {
		
		return SJsL.shallowClone(this);	
	}

	Array.prototype.deepClone = function() {

		return SJsL.deepClone(this);
	}


})(SJsL);
