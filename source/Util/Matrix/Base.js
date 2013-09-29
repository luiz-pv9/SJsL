;(function(SJsL) {

	// Constructor
	SJsL.Matrix = function(arg) {
		if(SJsL.typeOf(arg) === 'Array') {
			if(SJsL.typeOf(arg[0]) === 'Array')	 {
				this.matrix = arg;	
			} else {
				this.matrix = [arg];
			}
		} else {
			this.matrix = [[arg]];
		}
	}

	SJsL.Matrix.prototype.rows = function() {
		return this.matrix.length;
	}

	SJsL.Matrix.prototype.columns = function(index) {
		index = index || 0;
		return this.matrix[index].length;
	}

	SJsL.Matrix.prototype.rowAt = function(index) {
		return this.matrix[index];
	}

	SJsL.Matrix.prototype.columnAt = function(index) {
		var column = [];
		this.matrix.each(function(row) {
			column.push(row[index]);
		});
		return column;
	};

})(window.SJsL);