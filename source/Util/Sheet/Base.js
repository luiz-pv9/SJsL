;(function(SJsL) {

	// Constructor
	SJsL.Sheet = function(arg) {

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

	SJsL.Sheet.prototype.rowsCount = function() {

		return this.matrix.length;
	}

	SJsL.Sheet.prototype.columnsCount = function(index) {

		index = index || 0;
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

		basedRowIndex = basedRowIndex || 0;
		(0).upTo(this.matrix[basedRowIndex].length-1, function(colIndex) {

			fn(this.columnAt(colIndex));
		});
	}

	SJsL.Sheet.prototype.setRow = function(index, row) {

		this.matrix[index] = row;
		return this;
	}

	SJsL.Sheet.prototype.setColumn = function(index, col) {

		col.eachWithIndex(function(item, colIndex) {

			this.assureRow(index);
			this.matrix[index][colIndex] = item;
		});
		return this;
	}

	SJsL.Sheet.prototype.at = function(row, col) {

		if(!col) {

			return this.rowAt(row);
		}

		if(!row) {
			return this.columnAt(col);
		}

		return this.matrix[row][col];
	}

	SJsL.Sheet.prototype.assureRow = function(rowIndex) {

		this.matirx[rowIndex] = this.matrix[rowIndex] || [];
		return this;
	}

	SJsL.Sheet.prototype.set = function(row, col, value) {

		this.assureRow(row);
		this.matrix[row][col] = value;
		return this;
	}

	SJsL.Sheet.prototype.appendRow = function(row) {

		this.matrix.push(row);
	}

	SJsL.Sheet.prototype.appendColumn = function(col, basedRowIndex) {

		basedRowIndex = basedRowIndex || 0;
		return this.setColumn(this.matrix[basedRowIndex].length, col);
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
		return new SJsL.Sheet(columns);
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

		return new SJsL.Sheet(rows);
	}

	SJsL.Sheet.prototype.rowsWhereNot = function(conditions) {
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
		return new SJsL.Sheet(rows);
	}

	SJsL.Sheet.prototype.columnsWhere = function(conditions) {

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

		var matrix = new SJsL.Sheet();
		columns.eachWithIndex(function(col, index) {

			matrix.setColumn(col, index);
		});
		return matrix;
	}

	SJsL.Sheet.prototype.columnsWhereNot = function(conditions) {

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

		var matrix = new SJsL.Sheet();
		columns.eachWithIndex(function(col, index) {

			matrix.setColumn(col, index);
		});
		return matrix;
	}


})(window.SJsL);