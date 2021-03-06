var SJsL = { version: '0.0.3' };
;;(function(SJsL) {

    SJsL.deepClone = function(arg) {

        if('array'.isTypeOf(arg)) {

            return SJsL.deepCloneArray(arg);
        } 

        if('object'.isTypeOf(arg)) {

            return SJsL.deepCloneObject(arg);
        }
        return null;
    }

    SJsL.shallowClone = function(arg) {

        if('array'.isTypeOf(arg)) {

            return SJsL.shallowCloneArray(arg);
        } 

        if('object'.isTypeOf(arg)) {

            return SJsL.shallowCloneObject(arg);
        }
        return null;
    }

    SJsL.deepCloneArray = function(array) {

        var newArray = [];
        array.each(function(item) {

            if('array'.isTypeOf(item)) {

                newArray.push(SJsL.deepCloneArray(item));
            }
            else if ('object'.isTypeOf(item)) {

                newArray.push(SJsL.deepCloneObject(item));
            }
            else {

                newArray.push(item);
            }
        });
        return newArray;
    }

    SJsL.deepCloneObject = function(obj) {

        var newObject = {};
        SJsL.keys(obj).each(function(prop) {

            if('array'.isTypeOf(obj[prop])) {

                newObject[prop] = SJsL.deepCloneArray(obj[prop]);
            }
            else if('object'.isTypeOf(obj[prop])) {

                newObject[prop] = SJsL.deepCloneObject(obj[prop]);
            }
            else {

                newObject[prop] = obj[prop];
            }
        });
        return newObject;
    }

    SJsL.shallowCloneArray = function(array) {
        
        var newArray = [];
        array.each(function(e) {

            newArray.push(e);
        });
        return newArray;
    }

    SJsL.shallowCloneObject = function(obj) {

        var newObject = {};
        SJsL.keys(obj).each(function(prop) {

            newObject[prop] = obj[prop];
        });
        return newObject;
    }


})(SJsL);;;(function(SJsL) {

	SJsL.typeOf = function(e) {

	    return Object.prototype.toString.call(e).replace("[object ", "").replace("]", "").toLowerCase();
	}
	
})(SJsL);

;;(function(SJsL) {

    String.prototype.isTypeOf = function(arg) {
    	
        return SJsL.typeOf(arg) === this.toLowerCase();
    }

    String.prototype.each = function(fn) {

    	for(var i = 0; i < this.length; i++) {

    		fn(this.charAt(i));
    	}
    }

})(SJsL);;;(function(SJsL) {

	SJsL.keys = function(obj) {

		if('undefined'.isTypeOf(Object.keys)) {

			var keys = [];
			for(var prop in obj) {

				keys.push(prop);
			}
			return keys;
		}
		return Object.keys(obj);
	};

	SJsL.removeAttribute = function(object, attributeName) {

		delete object[attributeName];	
		return object;
	}

	SJsL.removeAttributes = function() {

		var obj = arguments[0];
		if('array'.isTypeOf(arguments[1])) {

			var self = this;
			arguments[1].each(function(attrName) {

				SJsL.removeAttribute(obj, attrName);
			});
		}
		else {

			for(var i = 1; i < arguments.length; i++) {

				SJsL.removeAttribute(obj, arguments[i]);
			}		
		}
	}

	SJsL.allowAttributes = function() {

		var obj = arguments[0];
		var allowedAttributes = [];
		var currentAttributes = SJsL.keys(obj);
		var self = this;
		if('array'.isTypeOf(arguments[1])) {

			arguments[1].each(function(attrName) {

				allowedAttributes.push(attrName);
			});
		}
		else {

			for(var i = 1; i < arguments.length; i++) {

				allowedAttributes.push(arguments[i]);
			}
		}
		currentAttributes.each(function(attr) {

			if(!allowedAttributes.contains(attr)) {

				SJsL.removeAttribute(obj, attr);
			}
		});
		return self;
	}

})(SJsL);;;(function(SJsL) {
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

	Array.prototype.removeAt = function(index) {

		return this.splice(index, 1)[0];
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

	Array.prototype.isLonely = function() {

		return this.length === 1;
	}
	Array.prototype.isSingle = Array.prototype.isLonely;
	Array.prototype.hasSingleItem = Array.prototype.isLonely;

	Array.prototype.isEmpty = function() {

		return this.length === 0;
	}


})(SJsL);
;;(function(SJsL) {
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

})(SJsL);;;(function(SJsL) {
	'use strict';

	// --
	// All those functions work with an array of objects
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

	Array.prototype.search = function(fn) {

		var list = [];
		this.each(function(e) {

			if(fn(e)) {

				list.push(e);
			}
		});
		return list;
	}

	Array.prototype.find = function(fn) {

		for(var i = 0; i < this.length; i++) {

			if(fn(this[i])) {
				
				return this[i];
			}
		}
		return null;
	}

	Array.prototype.filter = Array.prototype.search;

	Array.prototype.outNested = function(attr) {

		var obj = {};
		this.each(function(e) {

			obj[e[attr]] = obj[e[attr]] || [];
			obj[e[attr]].push(e);
		})
		return obj;
	}
	
	// Runs the native javascript sortBy - it changes the original array!!
	// Parameter (attr) is the attribute to sort the array by.
	// If a minus sign ("-") is passed in fron of the attribute - for example "-name",
	// the array will be sorted in reverse order by the attribute
	Array.prototype.nativeSortBy = function(attr) {

		var dynamicSort = function(attr) {

			var sortOrder = 1;
			if(attr[0] === "-") {

				sortOrder = -1;
				attr = attr.substr(1, attr.length - 1);
			}
			return function (a, b) {

				var result = (a[attr] < b[attr]) ? -1 : (a[attr] > b[attr]) ? 1 : 0;
				return result * sortOrder;
			}
		}
		return this.sort(dynamicSort(attr)); 
	}
	
	// Runs a bubble sort algorithm to sort the array
	Array.prototype.bubbleSortBy = function(attr) {

		var list = this.deepClone();
		var reverse = (attr.indexOf("-") === 0);
		var len = list.length, i, j, stop, temp;

		if(reverse) {

			attr = attr.substr(1, attr.length - 1);
			for(i=0; i<len; i++) {

				for(j=0, stop=len-i-1; j<stop; j++) {

					if(list[j][attr] < list[j+1][attr]) {

						temp = list[j];
						list[j] = list[j+1];
						list[j+1] = temp;
					}
				}
			}

		}
		else {

			for(i=0; i<len; i++) {

				for(j=0, stop=len-i-1; j<stop; j++) {

					if(list[j][attr] > list[j+1][attr]) {

						temp = list[j];
						list[j] = list[j+1];
						list[j+1] = temp;
					}
				}
			}
		}
		return list; 
	}

})(SJsL);;;(function(SJsL) {

	Number.prototype.times = function(fn) {

		for(var i = 0; i < this; i++) {

			fn(i);	
		}
	}

	Number.prototype.upTo = function(end, fn) {

		var list = [];
		for(var i = this; i < end; i++) {

			list.push(i);
		}
		return list;
	}

	Number.prototype.range = function() {

		var array = [];
		for(var i = 0; i < this; i++) {

			array.push(i);
		}
		return array;
	}

	Number.prototype.toString = function(prefix) {
		
		prefix = prefix || '';
		return prefix + this;
	};

})(SJsL);;;(function(SJsL) {

	Number.prototype.days = function() {

		var amount = this;

		return {
			ago: function() {
				return new Date(Date.today().previous().day(amount));
			},

			ahead: function() {
				return new Date(Date.today().next().day(amount));
			}
		}
	}

	Number.prototype.months = function() {

		var amount = this;

		return {
			ago: function() {
				return new Date(Date.today().previous().month(amount));
			},

			ahead: function() {
				return new Date(Date.today().next().month(amount));
			}
		}
	}

	Number.prototype.years = function() {

		var amount = this;

		return {
			ago: function() {
				return new Date(Date.today().previous().year(amount));
			},

			ahead: function() {
				return new Date(Date.today().next().year(amount));
			}
		}
	}

})(SJsL);;;(function(SJsL) {

	SJsL.runOnce = function(fn) {

		var i = 0;
		return function() {

			if(i++ === 0) {

				fn();
			}
		}
	}

})(SJsL);;;(function(SJsL) {

	'use strict';

	var dateSeparators = new RegExp(/[.,\/ -]/);

	SJsL.months = {
		'pt': {
			'full': ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
			'short': ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
		}
	};

	SJsL.days = {
		'pt': {
			'full': ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
			'short': ['Dom', 'Seg', 'Ter', "Qua", "Qui", "Sex", "Sab"]
		}
	};

	var zerofy = function(digit) {

		digit = digit.toString();
		if(digit.length === 1) {

			return "0" + digit;
		}
		return digit;
	}

	var prefixShortYear = function(year) {

		// If the ending digits of an year is greater than 80, I assume
		// you are dealing with ~ 1980.
		// Change it if you think this is wrong. Or delete the whole "if" block
		// to return always "20" with the prefix
		if(+year > 80) {

			return "19" + year;
		}
		return "20" + year;
	}

	var formats = {

		'd': function() {
			return this.getDate();
		},

		'D': function() {
			return zerofy(this.getDate());
		},

		'w': function() {
			return SJsL.days[SJsL.defaultLanguage]['short'][this.getDay()]
		},

		'W': function() {
			return SJsL.days[SJsL.defaultLanguage]['full'][this.getDay()]
		},

		'o': function() {
			return SJsL.months[SJsL.defaultLanguage]['short'][this.getMonth()];
		},

		'O': function() {
			return SJsL.months[SJsL.defaultLanguage]['full'][this.getMonth()];
		},

		'm': function() {
			return this.getMonth() + 1;
		},

		'M': function() {
			return zerofy(this.getMonth() + 1);
		},

		'y': function() {
			return +this.getYear().toString().substr(1, 3);
		},

		'Y': function() {
			return this.getFullYear();
		}
	}

	var interpreters = {

		'd': {
			category: 'day',
			fn: function(d) {
				return +d;
			}
		},
		'D': {
			category: 'day',
			fn: function(d) {
				return +d;
			}
		},
		'o': {
			category: 'month',
			fn: function(d) {
				return SJsL.months[SJsL.defaultLanguage]['short'].indexOf(d);
			}
		},
		'O': {
			category: 'month',
			fn: function(d) {
				return SJsL.months[SJsL.defaultLanguage]['full'].indexOf(d);
			}
		},
		'm': {
			category: 'month',
			fn: function(d) {
				return (+d) - 1;
			}
		},
		'M': {
			category: 'month',
			fn: function(d) {
				return (+d) - 1;
			}
		},
		'y': {
			category: 'year',
			fn: function(d) {
				return +prefixShortYear(d);
			}
		},
		'Y': {
			category: 'year',
			fn: function(d) {
				return +d;
			}
		}
	};

	Date.prototype.format = function(format) {

		var result = "";
		for(var i = 0, len = format.length; i < len; i++) {

			if(format.charAt(i) === '%') {

				result += formats[format.charAt(++i)].call(this);
			} else {
				result += format.charAt(i);
			}
		}
		return result;
	}

	Date.parser = function(rules) {

		rules = rules.split("%").map(function(rule) {

			return rule.trim().replace(dateSeparators, "");
		}).filter(function(rule) {

			return rule.length > 0;	
		});

		return {

			parse: function(date) {


				date = date.split(dateSeparators).map(function(part) {

					return part.trim();	
				}).reverse();

				var dateInfo = {

					year : null,
					month: null,
					day  : null
				};

				rules.each(function(rule) {

					if(interpreters[rule]) {

						var ruleFormat = interpreters[rule];	
						dateInfo[ruleFormat.category] = ruleFormat.fn(date.pop());
					}
					else {

						date.pop();
					}
				});

				var newDate = new Date(dateInfo.year, dateInfo.month, dateInfo.day);
				if(newDate.getTime()) {

					return newDate;
				}
				return null;
			}
		};
	}

	Date.prototype.clearTime = function() {

		this.setHours(0, 0, 0, 0);
		return this;
	}

	Date.today = function() {

		return new Date().clearTime();
	}

	Date.prototype.upTo = function(upperBound) {

		var self = this;

		return {
			diff: function(){
				return {
					in: {
						miliseconds: function() {

							return upperBound.getTime() - self.getTime();
						},
						seconds: function() {

							return this.miliseconds() / 1000;
						},
						minutes: function() {

							return this.seconds() / 60;
						},
						hours: function() {

							return this.minutes() / 60;
						},
						days: function() {

							return this.hours() / 24;
						},
						months: function() {

							return this.days() / 30;
						},
						years: function() {

							return this.months() / 12;
						}
					}
				}
			},

			range: function() {
				return {
					by: {
						days: function(interval) {
							var dates = [self];

							while(dates.last() < upperBound) {

								dates.push(dates.last().add(interval).days());
							}

							if(dates.last() > upperBound) {

								dates.pop();
							}

							return dates;
						},
						months: function(interval) {
							var dates = [self];

							while(dates.last() < upperBound) {

								dates.push(dates.last().add(interval).months());
							}

							if(dates.last() > upperBound) {

								dates.pop();
							}

							return dates;
						},
						years: function(interval) {
							var dates = [self];

							while(dates.last() < upperBound) {

								dates.push(dates.last().add(interval).years());
							}

							if(dates.last() > upperBound) {

								dates.pop();
							}

							return dates;
						}
					}
				}	
			}
		}
	}

	Date.prototype.is = function() {

		var day = this.getDay();

		return {
			monday: function() {

				return day === 1;
			},
			tuesday: function() {

				return day === 2;
			},
			wednesday: function() {

				return day === 3;
			},
			thursday: function() {

				return day === 4;
			},
			friday: function() {

				return day === 5;
			},
			saturday: function() {

				return day === 6;
			},
			sunday: function() {

				return day === 0;
			}
		}
	}

	Date.prototype.add = function(amount) {

		var stamp = this.getTime();

		return {

			days: function() {

				var newDate = new Date(stamp);
				newDate.setDate(newDate.getDate() + amount);
				return newDate;
			},
			months: function() {

				var newDate = new Date(stamp);
				newDate.setMonth(newDate.getMonth() + amount);
				return newDate;
			},
			years: function() {

				var newDate = new Date(stamp);
				newDate.setYear(newDate.getFullYear() + amount);
				return newDate;
			}
		};
	}

	Date.prototype.next = function() {

		var stamp = this.getTime();

		var nextWeekDay = function(offset) {
			var currentDate = new Date(stamp).clearTime();
			var daysToAdd = (offset - currentDate.getDay()) % 7;
			daysToAdd = (daysToAdd === 0) ? 7 : daysToAdd;
			return currentDate.add(daysToAdd).days();
		}

		return {

			year: function(amount) {

				amount = amount || 1;
				var newDate = new Date(stamp).clearTime();
				newDate.setYear(newDate.getFullYear() + amount);
				return newDate;
			},
			month: function(amount) {

				amount = amount || 1;
				var newDate = new Date(stamp).clearTime();
				newDate.setMonth(newDate.getMonth() + amount);
				return newDate;
			},
			day: function(amount) {

				amount = amount || 1;
				var newDate = new Date(stamp).clearTime();
				newDate.setDate(newDate.getDate() + amount);
				return newDate;
			},
			monday: function() {

				return nextWeekDay(8);
			},
			tuesday: function() {

				return nextWeekDay(9);
			},
			wednesday: function() {

				return nextWeekDay(10);
			},
			thursday: function() {

				return nextWeekDay(11);
			},
			friday: function() {

				return nextWeekDay(12);
			},
			saturday: function() {

				return nextWeekDay(13);
			},
			sunday: function() {

				return nextWeekDay(14);
			}
		}
	}

	Date.prototype.previous = function() {

		var stamp = this.getTime();

		var previousWeekDay = function(offset) {

			var currentDate = new Date(stamp).clearTime();
			var daysToAdd = 7 - ((offset - currentDate.getDay()) % 7);
			daysToAdd = (daysToAdd === 0) ? 7 : daysToAdd;
			return currentDate.add(-daysToAdd).days();
		}

		return {

			year: function(amount) {

				amount = amount || 1;
				var newDate = new Date(stamp).clearTime();
				newDate.setYear(newDate.getFullYear() - amount);
				return newDate;
			},
			month: function(amount) {

				amount = amount || 1;
				var newDate = new Date(stamp).clearTime();
				newDate.setMonth(newDate.getMonth() - amount);
				return newDate;
			},
			day: function(amount) {

				amount = amount || 1;
				var newDate = new Date(stamp).clearTime();
				newDate.setDate(newDate.getDate() - amount);
				return newDate;
			},
			monday: function() {
				return previousWeekDay(8);
			},
			tuesday: function() {

				return previousWeekDay(9);
			},
			wednesday: function() {

				return previousWeekDay(10);
			},
			thursday: function() {

				return previousWeekDay(11);
			},
			friday: function() {

				return previousWeekDay(12);
			},
			saturday: function() {

				return previousWeekDay(13);
			},
			sunday: function() {

				return previousWeekDay(14);
			}
		}
	}

})(SJsL);;;(function(SJsL) {

	var rowsReturn = function(sheet) {

		this.rows     = {};
		this.parentSheet = sheet;

		this.raw = function() {

			var indexes = this.rows.keys();
			if(indexes.hasSingleItem()) {

				return this.rows[indexes.head()];
			}
			var matrix = [];
			indexes.each(function(index) {

				matrix.push(this.rows[index]);
			});
			return matrix;
		}

		// This is dangerous a function!
		// The range is generated by the indexes. If, for example, the indexes
		// are [1, 3, 4], this function will generate a range from 1 up to 4.
		this.range = function() {

			var indexes = this.rows.keys();
			var sortedIndexes = indexes.shallowClone().sort();

			// The start of the first row
			var start = [sortedIndexes.head(), 0];
			// The end of the last row
			var end   = [sortedIndexes.last(), this.rows[sortedIndexes.last()].length];

			return new SJsL.Range(this.parentSheet, start, end);
		}

		this.sheet = function(preserveIndexes) {

			var sheet = new SJsL.Sheet();

			this.rows.keys().each(function(index) {

				if(preserveIndexes) {

					sheet.setRow(index, this.rows[index]);
				}
				else {

					sheet.appendRow(this.rows[index]);
				}
			});
			return sheet;
		}

		this.indexes = function() {

			return this.rows.keys();
		}

		this.index = function() {

			return this.indexes().head();
		}
	}

	rowsReturn.prototype.addRow = function(index, row) {

		this.rows[index] = row;
	}

	// Constructor
	SJsL.Sheet = function(arg) {

		if('array'.isTypeOf(arg)) {

			if('array'.isTypeOf(arg[0])) {

				this.matrix = arg;	
			}
			else {

				this.matrix = [arg];
			}
		}
		else {

			this.matrix = [[arg]];
		}
	}

	SJsL.Sheet.prototype.firstRow = function() {

		return this.rowAt(0);
	};

	SJsL.Sheet.prototype.lastRow = function() {

		return this.rowAt(this.rowsCount() - 1);
	};

	SJsL.Sheet.prototype.firstColumn = function() {

		return this.columnAt(0);
	};

	SJsL.Sheet.prototype.lastColumn = function() {

		return this.columnAt(this.columnsCount() - 1);
	};

	SJsL.Sheet.prototype.prettyPrint = function() {

		this.eachRow(function(row) {

			var rowString = "";

			row.each(function(cell) {

				rowString += (cell + " / ");
			});

			console.log(rowString);
		});
	}

	SJsL.Sheet.prototype.rowsCount = function() {

		if (this.matrix.length === 1) {

			if(this.matrix[0].length === 0) {

				return 0;
			}
			else {

				return 1;
			}
		}
		return this.matrix.length;
	}

	SJsL.Sheet.prototype.columnsCount = function(index) {

		index = index || 0;
		this.assureRow(index);
		return this.matrix[index].length;
	}

	SJsL.Sheet.prototype.rowAt = function(index) {

		return this.matrix[index];
	}

	SJsL.Sheet.prototype.columnAt = function(index) {

		var column = [];
		this.eachRow(function(row) {

			column.push(row[index]);
		});
		return column;
	}

	SJsL.Sheet.prototype.eachRow = function(fn) {

		this.matrix.each(fn);
	}

	SJsL.Sheet.prototype.eachColumn = function(fn, basedRowIndex) {

		var self = this;
		basedRowIndex = basedRowIndex || 0;
		(0).upTo(this.rowAt(basedRowIndex).length).each(function(colIndex) {
			fn(self.columnAt(colIndex), colIndex);
		});
	}

	SJsL.Sheet.prototype.eachCell = function(fn) {

		var self = this;
		self.eachRowWithIndex(function(row, rowIndex) {

			row.each(function(cell, colIndex) {

				fn(cell, rowIndex, colIndex);
			});
		});
		return this;
	}

	SJsL.Sheet.prototype.setRow = function(index, row) {

		this.matrix[index] = row;
		return this;
	}

	SJsL.Sheet.prototype.setColumn = function(index, col) {

		var self = this;
		col.each(function(item, colIndex) {

			self.assureRow(colIndex);
			self.matrix[colIndex][index] = item;
		});
		return this;
	}

	SJsL.Sheet.prototype.at = function(row, col) {

		if(col === null || col === void 0) {

			return this.rowAt(row);
		}

		if(row === null || row === void 0) {

			return this.columnAt(col);
		}

		return this.matrix[row][col];
	}

	SJsL.Sheet.prototype.assureRow = function(rowIndex) {

		this.matrix[rowIndex] = this.matrix[rowIndex] || [];
		return this;
	}

	SJsL.Sheet.prototype.set = function(row, col, value) {

		if(row && !col) {

			return this.setRow(row, value);
		}
		else if(!row && col) {

			return this.setColumn(col, value);
		}
		else if(row && col) {

			this.assureRow(row);
			this.matrix[row][col] = value;
			return this;
		}

		return this;
	}

	SJsL.Sheet.prototype.appendRow = function(row) {

		this.matrix.push(row);
	}

	SJsL.Sheet.prototype.appendColumn = function(column, basedRowIndex) {

		basedRowIndex = basedRowIndex || 0;
		return this.setColumn(this.columnsCount(basedRowIndex), column);
	}

	SJsL.Sheet.prototype.findRow = function(fn) {

		for(var i = 0, len = this.rowsCount(); i < len; i++) {

			if(fn(this.rowAt(i))) {

			}
		}
	}

	SJsL.Sheet.prototype.filterRows = function(fn) {

		var rows = [];
		this.eachRow(function(row) {

			if(fn(row)) {
				
				rows.push(row);
			}
 		});
 		return new SJsL.Sheet(rows);
	}

	SJsL.Sheet.prototype.filterColumns = function(fn) {

		var columns = [];
		this.eachColumn(function(col) {

			if(fn(col)) {

				columns.push(col);
			}
		});

		var matrix = new SJsL.Sheet();
		columns.each(function(col, index) {

			matrix.setColumn(index, col);
		});
		return matrix;
	}

	// conditions: {
	// 	index: 3,
	// 	value: 'foo'
	// }
	// Rows where the third element equals foo will pass the test
	SJsL.Sheet.prototype.rowsWhere = function(conditions) {

		if('object'.isTypeOf(conditions)) {
			conditions = [conditions];
		}

		return this.filterRows(function(row) {

			var match = true;
			conditions.each(function(condition) {

				if(row[condition.index] !== condition.value) {

					match = false;
				}
			});
			return match;
		});
	}

	SJsL.Sheet.prototype.rowsWhereNot = function(conditions) {

		if('object'.isTypeOf(conditions)) {
			conditions = [conditions];
		}

		return this.filterRows(function(row) {

			var match = true;
			conditions.each(function(condition) {

				if(row[condition.index] !== condition.value) {

					match = false;
				}
			});
			return !match;
		});
	}

	SJsL.Sheet.prototype.range = function(start, end) {

		return new SJsL.Range(this, start, end);
	}

	SJsL.Sheet.prototype.columnsWhere = function(conditions) {

		if('object'.isTypeOf(conditions)) {

			conditions = [conditions];
		}


		return this.filterColumns(function(col) {

			var match = true;
			conditions.each(function(condition) {

				if(col[condition.index] !== condition.value) {

					match = false;
				}
			});
			return match;
		});
	}

	SJsL.Sheet.prototype.columnsWhereNot = function(conditions) {

		if('object'.isTypeOf(conditions)) {

			conditions = [conditions];
		}


		return this.filterColumns(function(col) {

			var match = true;
			conditions.each(function(condition) {

				if(col[condition.index] !== condition.value) {

					match = false;
				}
			});
			return !match;
		});
	}

	SJsL.Sheet.prototype.clone = function() {

		return new SJsL.Sheet(this.matrix.deepClone());	
	};


})(SJsL);;;(function(SJsL) {

	SJsL.Range = function(sheet, start, end) {

		this.sheet = sheet;
		this.matrix = sheet.matrix;

		this.start = start;
		this.end = end;

		this.rowRange = this.start[0].upTo(this.end[0] + 1);
		this.columnRange = this.start[1].upTo(this.end[1] + 1);

		this.offsetColumn = this.columnRange.head();
		this.offsetRow = this.rowRange.head();
	}

	SJsL.Range.prototype.rowAt = function(index) {

		return this.sheet.rowAt(index).subArray(this.columnRange.head(), this.columnRange.last());
	}

	SJsL.Range.prototype.columnAt = function(index) {

		return this.sheet.columnAt(index).subArray(this.rowRange.head(), this.rowRange.last());
	}

	SJsL.Range.prototype.at = function(row, col) {

		if(col === null || col === void 0) {

			return this.rowAt(row);
		}

		if(row === null || row === void 0) {

			return this.columnAt(col);
		}
		return this.sheet.at(row + this.offsetRow, col + this.offsetColumn);
	}

	SJsL.Range.prototype.eachRow = function(fn) {

		var self = this;
		var _index = 0;
		self.rowRange.each(function(index) {

			fn(self.rowAt(index), _index++);
		});
		return this;
	}

	SJsL.Range.prototype.eachColumn = function(fn) {

		var self = this;
		var _index = 0;
		self.columnRange.each(function(index) {

			fn(self.columnAt(index), _index++);
		});
		return this;
	}

	SJsL.Range.prototype.eachCell = function(fn) {

		var self = this;
		var _rowIndex = 0;
		this.eachRow(function(row, rowIndex) {

			var _colIndex = 0;

			row.each(function(cell, colIndex) {

				fn(cell, _rowIndex, _colIndex++);
			});

			_rowIndex++;
		});
		return this;
	}

	SJsL.Range.prototype.reduce = function(fn, memo) {

		this.eachCell(function(value, row, col) {

			memo = fn(memo, value, row, col);
		});
		return memo;
	}

	SJsL.Range.prototype.foldLeft = SJsL.Range.prototype.reduce; // alias

	SJsL.Range.prototype.set = function(row, col, value) {

		return this.sheet.set(row + this.offsetRow, col + this.offsetColumn, value);
	}

})(SJsL);;;(function(SJsL) {

	SJsL.ShuntingYard = function(expression) {

		expression = expression.replace(/[\[{]/g, "(");
		expression = expression.replace(/[\]}]/g, ")");
		expression = expression.replace(/ /g, "");

		var stack = [];
		var stage = [];

		// To extend the functionality of the operators change this function
		this.match = function(num1, num2, operator) {
			switch(operator) {
				case '+':
					return num1 + num2;
				case '-':
					return num1 - num2;
				case '/':
					return num1 / num2;
				case '*':
					return num1 * num2;
				case '^':
					return Math.pow(num1, num2);
				case '%':
					return num1 % num2;
			}	
			return 0;
		}

		this.calculate = function() {

			stack = [];
			stage = [];

			for(var i = 0; i < expression.length; i++) {

				var currentToken = expression[i];
				// We're dealing with a number, peek the next until the number ends
				if(currentToken === '0' || +currentToken) {

					var j = i;
					while(+expression[++j] || expression[j] === '0' || expression[j] === '.' || expression[j] === ',') {
						currentToken += expression.charAt(j);
					}
					i = j - 1; // Off by one Bug
				}

				if(+currentToken) {

					stage.push(+currentToken);
				}
				else {

					if(currentToken === ')') {

						var lastStack = null;
						do {
							lastStack = stack.pop();
							if(lastStack !== '(') {

								stage.push(lastStack);
							}
						} while(lastStack !== '(');
					}
					else {
						
						stack.push(currentToken);
					}
				} // if(+currentToken)
			} // for i in expression.length

			while(stack.length > 0) {
				stage.push(stack.pop());
			}

			var results = SJsL.shallowClone(stage).reverse();
			stack = [];
			stage = [];

			do {

				var token = results.pop();

				if(+token) {

					stack.push(token);
				}
				else {

					var num2 = stack.pop();
					var num1 = stack.pop();

					var result = this.match(+num1, +num2, token);
					stack.push(result);
				}

			} while(results.length > 0);

			return stack.pop();
		} // calculate
	}


	SJsL.FormulaWithVariable = function(formula) {

		this.originalFormula = formula;

		this.calculate = function(values) {

			var formula = this.originalFormula;
			SJsL.keys(values).each(function(key) {
				var value = values[key];
				formula = formula.replace(key, value);
			});
			return new SJsL.ShuntingYard(formula).calculate();
		}
	}

})(SJsL);;;(function(SJsL) {

    SJsL.NativeTree = function(config) {

        this.tree = [];
        this.uniqueField   = config.uniqueField   || 'id';
        this.childrenField = config.childrenField || 'children';
    }

    SJsL.NativeTree.prototype.setData = function(tree) {

        if(SJsL.typeOf(tree) === 'array') {

            this.tree = tree;
        } 
        else {

            this.tree = [tree];
        }
        return this;
    };

    SJsL.NativeTree.prototype.updateIdRegister = function() {

        var highest = this.flatten().pluck(this.uniqueField).max();
        if(+highest) {

            SJsL.setBaseId((+highest) + 1);
        }
    }

    SJsL.NativeTree.prototype.search = function(fn) {

        var list = [];
        this.each(function(node, deep) {

            if(fn(node, deep)) {

                list.push(node);
            }
        });
        return list;
    }

    SJsL.NativeTree.prototype.nodeChildren = function(node) {

        node[this.childrenField] = node[this.childrenField] || [];
        return node[this.childrenField];
    }

    SJsL.NativeTree.prototype.nodeHasChildren = function(node) {

        return this.nodeChildren(node).length > 0;
    }

    SJsL.NativeTree.prototype.nodeId = function(node) {

        return node[this.uniqueField];
    }

    SJsL.NativeTree.prototype.nodeSetId = function(node, id) {

        node[this.uniqueField] = id;
        return node;
    }

    SJsL.NativeTree.prototype.nodeDuplicate = function(id) {

        var node = this.find(id);
        var newNode = SJsL.deepClone(node);
        this.nodeUpdateId(newNode);
        this.nodeChildren(this.nodeParent(node)).push(newNode);
        return newNode;
    }

    SJsL.NativeTree.prototype.nodeRemove = function(id) {

        var node = this.find(id);
        this.nodeChildren(this.nodeParent(node)).remove(node);
        return node;
    }

    SJsL.NativeTree.prototype.nodeMove = function(fromId, toId) {

        var node = this.nodeRemove(fromId);
        this.nodeChildren(this.find(toId)).push(node);
        return this;
    }

    SJsL.NativeTree.prototype.nodeUpdateId = function(node) {

        var self = this;
        this.nodeSetId(node, SJsL.generateId());
        if(self.nodeHasChildren(node)) {

            self.nodeChildren(node).each(function(node) {

                self.nodeUpdateId(node);
            });
        }
    }

    SJsL.NativeTree.prototype.nodeParent = function(node) {

        if('number'.isTypeOf(node)) {

            node = this.find(node); 
        }

        var self = this;
        // The parent of the node is the one that contains it
        var parent = this.findBy(function(n) {

            return self.nodeChildren(n).contains(node);
        });

        return parent;
    }

    SJsL.NativeTree.prototype.flatten = function() {

        var list = [];
        this.each(function(node, deep) {

            list.push(node);
        });
        return list;
    }

    SJsL.NativeTree.prototype.associateUniqueValues = function() {

        var self = this;
        self.updateIdRegister();

        this.each(function(node) {

            if(!self.nodeId(node)) {

                self.nodeSetId(node, SJsL.generateId());
            }
        });
        return this;
    }

    SJsL.NativeTree.prototype.each = function(fn, subtree, deep) {

        var self = this;
        subtree = subtree || self.tree;
        deep = deep || 0;
        subtree.each(function(node) {

            fn(node, deep);
            if(self.nodeHasChildren(node)) {

                self.each(fn, self.nodeChildren(node), deep + 1);
            }
        });
    }

    SJsL.NativeTree.prototype.find = function(id, subtree) {

        var self = this;
        subtree = subtree || self.tree;
        for(var i = 0; i < subtree.length; i++) {

            if(self.nodeId(subtree[i]) === id) {

                return subtree[i];
            }
            else {

                if(self.nodeHasChildren(subtree[i])) {

                    var item = self.find(id, self.nodeChildren(subtree[i]));
                    if(item) return item;
                }
            }
        }
        return null;
    }

    SJsL.NativeTree.prototype.findBy = function(fn, subtree) {

        var self = this;
        subtree = subtree || self.tree;
        for(var i = 0; i < subtree.length; i++) {

            if(fn(subtree[i])) {

                return subtree[i];
            }
            else {

                if(self.nodeHasChildren(subtree[i])) {

                    var item = self.findBy(fn, self.nodeChildren(subtree[i]));
                    if(item) return item;
                }
            }
        }
        return null;
    }

    SJsL.NativeTree.prototype.clone = function() {

        return new SJsL.NativeTree({
            uniqueField: this.uniqueField,
            childrenField: this.childrenField
        }).setData(SJsL.deepClone(this.tree));
    }

})(SJsL);;;(function(SJsL) {

	var _id = 0;

    SJsL.setBaseId = function(id) {
        
        if(_id < id) {

            _id = id;
        }
    }

    SJsL.currentId = function() {

        return _id;
    }

    SJsL._resetId = function(id) {

        id = id || 0;
        _id = id;
    }

	SJsL.generateId = function(prefix) {

		prefix = prefix || "";
        var newId = prefix + (++_id);
        return +newId || newId;
	}

})(SJsL);

;;(function(SJsL) {

	// --------------------------------------------------------------
	// Authorization plugin inspired by Ruby on Rails' cancan (ryanb)
	// --------------------------------------------------------------

	SJsL.Authorization = function(user) {

		var self = this;
		this.user = user;

		this.addAction = function(action) {

			this.permissions = this.permissions || {};
			this.can = this.can || {};

			this.permissions[action] = [];

			this.can[action] = function(subject, fn) {

				self.permissions[action].push({
					subject: subject,
					fn: fn
				});
			}
		}

		// There are 4 default actions: read, edit, create, delete and manage.
		// Manage is simply a helper that calls the other four(read, edit, create and delete)
		// for the subject passed.
		this.can = {
			manage: function(subject, fn) {

				var self = this;
				SJsL.keys(this).each(function(key) {

					if(key !== 'manage') { // Prevent infinite stack call

						self[key](subject, fn);
					}
				});
			}
		};

		// Default actions
		this.addAction("read");
		this.addAction("edit");
		this.addAction("create");
		this.addAction("delete");

		// This is the hash that will be filled after the user calls the setRules.
		// It will search for a subject and and allow actions (or not).
		this.permissions = {
			read:   [],
			edit:   [],
			create: [],
			delete: [],
			manage: []
		};

		this.setRules = function(fn) {

			var self = this;
			fn.call(this, this.user);
			this.user.can = {}; // The 'can' hash is added to the user object passed in the constructor.

			SJsL.keys(self.permissions).each(function(key) {

				var rules = self.permissions[key];

				self.user.can[key] = function(subject, instance) {

					var rule = rules.find(function(rule) {

						return rule.subject === subject;
					});

					// If there is an "all" in any of the actions (read, edit, etc)
					// Allow everything for that action
					if(rules.find(function(rule) {

						return rule.subject.toLowerCase() === 'all';
					})) { return true; }

					// If there is a "none" in any of the actions (read, edit, etc)
					// Deny everything for that action (oposite of all)
					if(rules.find(function(rule) {

						return rule.subject.toLowerCase() === 'none';
					})) { return false; }



					if(rule) {

						if(rule.fn) {

							if(instance) {

								if(rule.fn(instance)) {

									return true;
								}
								else {

									return false;
								}
							}
							else {

								return true;
							}
						}
						else {

							return true;
						}
					}
					else {

						return false;
					}
				}
			});
		}
	}


})(SJsL);
;if (typeof exports !== 'undefined') {
    
    module.exports = SJsL;
}
else {

    window.SJsL = SJsL;
}
