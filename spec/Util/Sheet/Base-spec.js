describe("Core / Util / Sheet / Base", function() {


    var sheet = null;

    beforeEach(function() {

        sheet = new SJsL.Sheet([
            ["a", "b", "c", "d", "e"],
            [10, 20, 30, 40, 50],
            [100, 200, 300, 400, 500],
            ["i", "iif", "iiif", "iiiif", "iiiiif"]
        ]);
    });

    it("exists", function() {
        expect(sheet).toBeTruthy();
    });

    it("rowsCount", function() {
        expect(sheet.rowsCount()).toEqual(4);
    });

    it("columnsCount", function() {
        expect(sheet.columnsCount()).toEqual(5);
    });

    it("rowAt", function() {
        expect(sheet.rowAt(1).head()).toEqual(10);
        expect(sheet.rowAt(2).head()).toEqual(100);
    });

    it("columnAt", function() {
        expect(sheet.columnAt(1).head()).toEqual("b");
        expect(sheet.columnAt(4).last()).toEqual("iiiiif");
    });

    it("eachRow", function() {

        var sum = 0;
        sheet.eachRow(function(row) {
            if(+row.head()) {
                sum += row.head();
            }
        });
        expect(sum).toEqual(110);
    });

    it("eachColumn", function() {
        var concat = "";
        sheet.eachColumn(function(col) {
            concat += col.head();
        });
        expect(concat).toEqual("abcde");
    });

    it("setRow", function() {

        sheet.setRow(1, sheet.rowAt(1).map(function(n) { 
            return n * 2;}
        ));

        expect(sheet.rowAt(1).head()).toEqual(20);
    });


    // sheet = new SJsL.Sheet([
    //     ["a", "b", "c", "d", "e"],
    //     [10, 20, 30, 40, 50],
    //     [100, 200, 300, 400, 500],
    //     ["i", "iif", "iiif", "iiiif", "iiiiif"]
    // ]);
    it("setColumn", function() {

        var newColumn = sheet.columnAt(2).map(function(n) {
            if(+n) {
                return n + 3;
            } else {
                return n;
            }
        });


        sheet.setColumn(2, newColumn);

        expect(sheet.columnAt(2)[1]).toEqual(33);
    });

    it("at", function() {

        expect(sheet.at(0).head()).toEqual("a");
        expect(sheet.at(null, 1)).toEqual(sheet.columnAt(1));
        expect(sheet.at(0, 1)).toEqual("b");
    });

    it("set", function() {
        sheet.set(1,1, 25);
        expect(sheet.at(1, 1)).toEqual(25);
    });

    it("appendRow", function() {

        sheet.appendRow([1, 2, 3, 4, 5]);
        expect(sheet.rowsCount()).toEqual(5);
    });

    it("appendColumn", function() {
        sheet.appendColumn([1, 2, 3, 4]);
        expect(sheet.columnsCount()).toEqual(6);
    });

    it("filterRows", function() {

        var newSheet = sheet.filterRows(function(row) {
            if(+row.head()) {
                return true;
            }
        });

        expect(newSheet.rowsCount()).toEqual(2);
    });

    it("filterColumns", function() {

        var newSheet = sheet.filterColumns(function(col) {
            if(col.head() === "b" || col.head() === 'c') {
                return true;
            }
        });

        expect(newSheet.columnsCount()).toEqual(2);
    });

    it("rowsWhere", function() {

        var newSheet = sheet.rowsWhere({
            index: 0,
            value: 10
        });

        expect(newSheet.rowsCount()).toEqual(1);

        // -----------------

        newSheet = sheet.rowsWhere([
            {index: 0, value: 10},
            {index: 1, value: 200}
        ]);

        expect(newSheet.rowsCount()).toEqual(0);

        // -------------------

        var newSheet = sheet.clone();
        newSheet.setColumn(0, [2, 2, 2, 3]);
        newSheet.setColumn(1, [4, 4, 2, 4]);

        newSheet = newSheet.rowsWhere({
            index: 0, value: 2
        });

        expect(newSheet.rowsCount()).toEqual(3);


        // ROWS WHERE NOT
        newSheet = newSheet.rowsWhereNot({
            index: 1, value: 2
        });

        expect(newSheet.rowsCount()).toEqual(2);

        // -------------------
    });

    it("columnsWhere", function() {

        var newSheet = sheet.columnsWhere({
            index: 0, value: "b"
        });

        expect(newSheet.rowsCount()).toEqual(4);
        expect(newSheet.columnsCount()).toEqual(1);

        sheet.setRow(0, [1, 1, 2, 1, 1]);

        newSheet = sheet.columnsWhere({
            index: 0, value: 1
        });

        expect(newSheet.columnsCount()).toEqual(4);
        expect(newSheet.columnAt(2)[1]).toEqual(40);


        // COLUMNS WHERE NOT

        newSheet = newSheet.columnsWhereNot({
            index: 1, value: 40
        });

        expect(newSheet.columnsCount()).toEqual(3);
    });

    it("clone", function() {
        var newSheet = sheet.clone();
        expect(newSheet).not.toBe(sheet);
        expect(newSheet.matrix).not.toBe(sheet.matrix);
        expect(newSheet.matrix[0]).not.toBe(sheet.matrix[0]);
    });


});