;(function(SJsL) {

	var A = SJsL.A;
	var N = SJsL.N;

	SJsL.Range = function(sheet, start, end) {

		this.sheet = sheet;
		this.matrix = sheet.matrix;

		this.start = start;
		this.end = end;

		this.rowRange = N.upTo(this.start[0], this.end[0] + 1);
		this.columnRange = N.upTo(this.start[1], this.end[1] + 1);

		this.offsetColumn = A.head(this.columnRange);
		this.offsetRow = A.head(this.rowRange);
	}

	SJsL.Range.prototype.rowAt = function(index) {

		return A.subArray(this.sheet.rowAt(index), A.head(this.columnRange), 
			A.last(this.columnRange));
	}

	SJsL.Range.prototype.columnAt = function(index) {

		return A.subArray(this.sheet.columnAt(index), A.head(this.rowRange), 
			A.last(this.rowRange));
	}

	SJsL.Range.prototype.at = function(row, col) {

		if(col === null || col === void 0) {

			return this.rowAt(row);
		}

		if(row === null || row === void 0) {

			return this.columnAt(col);
		}
		return this.sheet.at(row + this.offsetRow, col + this.offsetColumn);
	}

	SJsL.Range.prototype.eachRow = function(fn) {

		var self = this;
		var _index = 0;
		A.each(self.rowRange, function(index) {

			fn(self.rowAt(index), _index++);
		});
		return this;
	}

	SJsL.Range.prototype.eachColumn = function(fn) {

		var self = this;
		var _index = 0;
		A.each(self.columnRange, function(index) {

			fn(self.columnAt(index), _index++);
		});
		return this;
	}

	SJsL.Range.prototype.eachCell = function(fn) {

		var self = this;
		var _rowIndex = 0;
		this.eachRow(function(row, rowIndex) {

			var _colIndex = 0;

			A.each(row, function(cell, colIndex) {

				fn(cell, _rowIndex, _colIndex++);
			});

			_rowIndex++;
		});
		return this;
	}

	SJsL.Range.prototype.reduce = function(fn, memo) {

		this.eachCell(function(value, row, col) {

			memo = fn(memo, value, row, col);
		});
		return memo;
	}

	SJsL.Range.prototype.foldLeft = SJsL.Range.prototype.reduce; // alias

	SJsL.Range.prototype.set = function(row, col, value) {

		return this.sheet.set(row + this.offsetRow, col + this.offsetColumn, value);
	}

})(SJsL);