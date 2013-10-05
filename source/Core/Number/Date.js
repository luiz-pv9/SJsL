;(function(SJsL) {

	Number.prototype.days = function(days) {

		var timeStamp = 86400000 * days;

		return {
			ago: function() {
				return new Date(Date.today().getTime() - timeStamp);
			},

			ahead: function() {
				return new Date(Date.today().getTime() + timeStamp);
			}
		}	
	}

})(window.SJsL);