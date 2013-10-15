describe("Util / Sheet / Range", function() {

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

    it("creates a range object", function() {

        expect(sheet.range([0,0], [2,3])).toBeTruthy();
    });

    describe("Range object", function() {

        var range = null;

        beforeEach(function() {

            range = sheet.range([1,1], [3,3]);
            //      [a,    b,     c,      d,       e],
            //      [10,   [20],    30,   40,      50],
            //      [100,  200,   300,    400,     500],
            //      [i,    iif,   iiif,   [iiiif], iiiiif]
        });

        it("loops through the rows in the range", function() {

            // 20, 200, 'iif'
            var sum = 0;
            range.eachRow(function(row) {

                if(+row.head()) {

                    sum += +row.head();
                }
            });
            expect(sum).toEqual(220);
        });

        it("loops through the columns in the range", function() {

            // 20, 30, 40
            var sum = 0 ;
            range.eachColumn(function(col) {

                sum += col.head();                
            });
            expect(sum).toEqual(90);
        });

        it("loops through each cell", function() {

            var total = 0;
            range.eachCell(function(val, row, col) {

                total++;
            });

            expect(total).toEqual(9);
        });

        it("retrieves the value in a position", function() {

            expect(range.at(0, 0)).toEqual(20);
            expect(range.at(1, 1)).toEqual(300);
        });

        it("sets the value of a cell", function() {

            range.set(0, 0, 10);
            expect(range.at(0, 0)).toEqual(10);
            expect(sheet.at(1, 1)).toEqual(10); // reflects in the sheet
        });
    });

});