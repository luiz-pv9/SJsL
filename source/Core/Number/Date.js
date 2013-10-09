;(function(SJsL) {

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

})(SJsL);