;(function(SJsL) {

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

			console.log(row);
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
		(0).upTo(this.rowAt(basedRowIndex).length, function(colIndex) {
			fn(self.columnAt(colIndex));
		});
	}

	SJsL.Sheet.prototype.setRow = function(index, row) {

		this.matrix[index] = row;
		return this;
	}

	SJsL.Sheet.prototype.setColumn = function(index, col) {

		var self = this;
		col.eachWithIndex(function(item, colIndex) {

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

		var matrix = new SJsL.Sheet();
		columns.eachWithIndex(function(col, index) {

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


})(window.SJsL);