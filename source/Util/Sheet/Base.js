;(function(SJsL) {

	var rowsReturn = function(sheet) {

		this.rows     = {};
		this.parentSheet = sheet;

		this.raw = function() {

			var indexes = this.indexes();
			if(indexes.length === 1) {

				return this.rows[indexes.head()];
			}
			var matrix = [];
			SJsL.A.each(indexes, function(index) {

				matrix.push(this.rows[index]);
			});
			return matrix;
		}

		// This is dangerous a function!
		// The range is generated by the indexes. If, for example, the indexes
		// are [1, 3, 4], this function will generate a range from 1 up to 4.
		this.range = function() {

			var indexes = this.indexes();
			var sortedIndexes = SJsL.shallowClone(indexes).sort();

			// The start of the first row
			var start = [SJsL.A.head(sortedIndexes), 0];
			// The end of the last row
			var end   = [SJsL.A.last(sortedIndexes), this.rows[SJsL.A.last(sortedIndexes)].length];

			return new SJsL.Range(this.parentSheet, start, end);
		}

		this.sheet = function(preserveIndexes) {

			var sheet = new SJsL.Sheet();
			SJsL.O.eachKey(this.rows, function(index) {

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

			return SJsL.O.keys(this.rows);
		}

		this.index = function() {

			return SJsL.A.head(this.indexes());
		}
	}

	rowsReturn.prototype.addRow = function(index, row) {

		this.rows[index] = row;
	}

	// Constructor
	SJsL.Sheet = function(arg) {

		if(SJsL.isArray(arg)) {

			if(SJsL.isArray(arg[0])) {

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

		SJsL.A.each(this.matrix, fn);
	}

	SJsL.Sheet.prototype.eachColumn = function(fn, basedRowIndex) {

		var self = this;
		basedRowIndex = basedRowIndex || 0;
		var range = SJsL.N.upTo(0, this.rowAt(basedRowIndex).length);
		SJsL.A.each(range, function(colIndex) {

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
		SJsL.A.each(col, function(item, colIndex) {

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
		SJsL.A.each(columns, function(col, index) {

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

		if(SJsL.isObject(conditions)) {

			conditions = [conditions];
		}

		return this.filterRows(function(row) {

			var match = true;
			SJsL.A.each(conditions, function(condition) {

				if(row[condition.index] !== condition.value) {

					match = false;
				}
			});
			return match;
		});
	}

	SJsL.Sheet.prototype.rowsWhereNot = function(conditions) {

		if(SJsL.isObject(conditions)) {

			conditions = [conditions];
		}

		return this.filterRows(function(row) {

			var match = true;
			SJsL.A.each(conditions, function(condition) {

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

		if(SJsL.isObject(conditions)) {

			conditions = [conditions];
		}


		return this.filterColumns(function(col) {

			var match = true;
			SJsL.A.each(conditions, function(condition) {

				if(col[condition.index] !== condition.value) {

					match = false;
				}
			});
			return match;
		});
	}

	SJsL.Sheet.prototype.columnsWhereNot = function(conditions) {

		if(SJsL.isObject(conditions)) {

			conditions = [conditions];
		}


		return this.filterColumns(function(col) {

			var match = true;
			SJsL.A.each(conditions, function(condition) {

				if(col[condition.index] !== condition.value) {

					match = false;
				}
			});
			return !match;
		});
	}

	SJsL.Sheet.prototype.clone = function() {

		return new SJsL.Sheet(SJsL.deepClone(this.matrix));	
	};


})(SJsL);