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

	SJsL.Matrix.prototype.eachRow = function(fn) {
		this.matrix.each(fn);
	};

	SJsL.Matrix.prototype.eachColumn = function(fn, basedRowIndex) {
		basedRowIndex = basedRowIndex || 0;
		(0).upTo(this.matrix[basedRowIndex].length-1, function(colIndex) {
			fn(this.columnAt(colIndex));
		});
	};

	SJsL.Matrix.prototype.at = function(row, col) {
		if(!col) {
			return this.matrix[row];
		}
		return this.matrix[row][col];
	}

	SJsL.Matrix.prototype.set = function(row, col, value) {
		this.matrix[row][col] = value;
		return this;
	}

	SJsL.Matrix.prototype.appendRow = function(row) {
		this.matrix.push(row);
	}

	SJsL.Matrix.prototype.appendColumn = function(col, basedRowIndex) {
		basedRowIndex = basedRowIndex || 0;
		var lastValueIndex = this.matrix[basedRowIndex].length;
		this.eachRow(function(row) {
			row[lastValueIndex] = col.shift();
		});
		return this;
	}

	SJsL.Matrix.prototype.rowsWhere = function(condition) {
	}

	SJsL.Matrix.prototype.rowsWhereNot = function(condition) {

	}

})(window.SJsL);