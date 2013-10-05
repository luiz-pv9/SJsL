;(function(SJsL) {

	// Constructor
	SJsL.Matrix = function(arg) {

		if(SJsL.typeOf(arg) === 'Array') {

			if(SJsL.typeOf(arg[0]) === 'Array')	 {

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

	SJsL.Matrix.prototype.rowsCount = function() {

		return this.matrix.length;
	}

	SJsL.Matrix.prototype.columnsCount = function(index) {

		index = index || 0;
		return this.matrix[index].length;
	}

	SJsL.Matrix.prototype.rowAt = function(index) {

		return this.matrix[index];
	}

	SJsL.Matrix.prototype.columnAt = function(index) {

		var column = [];
		this.eachRow(function(row) {

			column.push(row[index]);
		});
		return column;
	}

	SJsL.Matrix.prototype.eachRow = function(fn) {

		this.matrix.each(fn);
	}

	SJsL.Matrix.prototype.eachColumn = function(fn, basedRowIndex) {

		basedRowIndex = basedRowIndex || 0;
		(0).upTo(this.matrix[basedRowIndex].length-1, function(colIndex) {

			fn(this.columnAt(colIndex));
		});
	}

	SJsL.Matrix.prototype.setRow = function(index, row) {

		this.matrix[index] = row;
		return this;
	}

	SJsL.Matrix.prototype.setColumn = function(index, col) {

		col.eachWithIndex(function(item, colIndex) {

			this.matrix[index][colIndex] = item;
		});
		return this;
	}

	SJsL.Matrix.prototype.at = function(row, col) {

		if(!col) {

			return this.matrix[row];
		}

		if(!row) {
			return this.columnAt(col);
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
		return this.setColumn(this.matrix[basedRowIndex].length, col);
	}

	SJsL.Matrix.prototype.filterRows = function(fn) {

		var rows = [];
		this.eachRow(function(row) {

			if(fn(row)) {
				
				rows.push(row);
			}
 		});
 		return new SJsL.Matrix(rows);
	}

	SJsL.Matrix.prototype.filterColumns = function(fn) {

		var columns = [];
		this.eachColumn(function(col) {

			if(fn(col)) {

				columns.push(col);
			}
		});
		return new SJsL.Matrix(columns);
	}

	SJsL.Matrix.prototype.rowsWhere = function(conditions) {

		if('object'.isTypeOf(conditions)) {
			conditions = [conditions];
		}

		var rows = [];
		this.eachRow(function(row) {

			var match = true;
			conditions.each(function(condition) {

				if(row[condition.index] !== condition.value) {

					match = false;
				}
			});

			if(match) {

				rows.push(row);
			}
		});

		return new SJsL.Matrix(rows);
	}

	SJsL.Matrix.prototype.rowsWhereNot = function(conditions) {
		if('object'.isTypeOf(conditions)) {
			conditions = [conditions];
		}

		var rows = [];

		this.eachRow(function(row) {

			var match = true;
			conditions.each(function(condition) {

				if(row[condition.index] !== condition.value) {

					match = false;
				}

			});

			if(!match) {

				rows.push(row);
			}
		});
		return new SJsL.Matrix(rows);
	}

	SJsL.Matrix.prototype.columnsWhere = function(conditions) {

		if('object'.isTypeOf(conditions)) {

			conditions = [conditions];
		}

		var columns = [];
		this.eachColumn(function(col) {

			var match = true;
			conditions.each(function(condition) {

				if(col[condition.index] !== condition.value) {

					match = false;
				}
			});

			if(match) {

				columns.push(col);
			}
		});

		var matrix = new SJsL.Matrix();
		columns.eachWithIndex(function(col, index) {

			matrix.setColumn(col, index);
		});
		return matrix;
	}

	SJsL.Matrix.prototype.columnsWhereNot = function(conditions) {

		if('object'.isTypeOf(conditions)) {
			conditions = [conditions];
		}

		var columns = [];
		this.eachColumn(function(col) {

			var match = true;

			conditions.each(function(condition) {
				if(col[condition.index] !== condition.value) {

					match = false;
				}
			});

			if(!match) {

				columns.push(col);
			}
		});

		var matrix = new SJsL.Matrix();
		columns.eachWithIndex(function(col, index) {

			matrix.setColumn(col, index);
		});
		return matrix;
	}


})(window.SJsL);