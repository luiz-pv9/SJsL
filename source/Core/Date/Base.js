;(function(SJsL) {

	'use strict';

	var dateSeparators = new RegExp(/[.,\/ -]/);

	SJsL.months = {
		'pt': ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
	};

	SJsL.days = {
		'pt': ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
	};

	Date.prototype.clearTime = function() {

		this.setHours(0, 0, 0, 0);
		return this;
	}

	Date.today = function() {

		return new Date().clearTime();
	}

	Date.parser = function(format) {

		var formats = format.split(dateSeparators);

		return {
			parse: function(string) {
				var parts = string.split(dateSeparators);

				var newDateInfo = {
					year: null,
					month: null,
					day: null
				};

				formats.eachWithIndex(function(format, index) {

					switch(format) {
						case 'y':
							newDateInfo.year = '20' + parts[index];
							break;
						case 'Y':
							newDateInfo.year = parts[index];
							break;
						case 'm':
							newDateInfo.month = parts[index];
							break;
						case 'M':
							newDateInfo.month = SJsL.months[SJsL.defaultLocale].indexOf(parts[index]);
							break;
						case 'd':
							newDateInfo.day = parts[index];
							break;
					}
				});
				return new Date(newDateInfo.year, newDateInfo.month, newDateInfo.day).clearTime();
			}
		}
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

	Date.prototype.format = function(format) {

		var self = this;
		var dateString = "";

		var escaped = false;
		format.each(function(char) {
			if(char === '[') {
				escaped = true;
				return;
			}

			if(char === ']') {
				escaped = false;
				return;
			}

			if(!escaped) {
				dateString += self.matchCharacter(char);
			} else {
				dateString += char;
			}
		});

		return dateString;
	}

	Date.prototype.matchCharacter = function(char) {

		var zerofy = function(digit) {
			digit = digit.toString();
			if(digit.length === 1) {
				return "0" + digit;
			}
			return digit;
		}

		switch(char) {

			case 'd':
				return zerofy(this.getDate());

			case 'D':
				return SJsL.days[SJsL.defaultLocale][this.getDay()];

			case 'm':
				return zerofy(this.getMonth() + 1);

			case 'M':
				return SJsL.months[SJsL.defaultLocale][this.getMonth()];

			case 'y':
				return this.getYear().toString().substring(1, 3);

			case 'Y':
				return this.getFullYear().toString();

			default:
				return char;
		}
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