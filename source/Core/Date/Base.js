;(function(SJsL) {

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

								dates.push(dates.last().add().days(interval));
							}

							if(dates.last() > upperBound) {

								dates.pop();
							}

							return dates;
						},
						months: function(interval) {
							var dates = [self];

							while(dates.last() < upperBound) {

								dates.push(dates.last().add().months(interval));
							}

							if(dates.last() > upperBound) {

								dates.pop();
							}

							return dates;
						},
						years: function(interval) {
							var dates = [self];

							while(dates.last() < upperBound) {

								dates.push(dates.last().add().years(interval));
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

	Date.prototype.add = function() {

		var stamp = this.getTime();

		return {

			days: function(amount) {

				var newDate = new Date(stamp);
				newDate.setDate(newDate.getDate() + amount);
				return newDate;
			},
			months: function(amount) {

				var newDate = new Date(stamp);
				newDate.setMonth(newDate.getMonth() + amount);
				return newDate;
			},
			years: function(amount) {

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
			return currentDate.add().days(daysToAdd);
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
			return currentDate.add().days(-daysToAdd);
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

})(window.SJsL);