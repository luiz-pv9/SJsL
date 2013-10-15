describe("Core / Number / Base", function() {

    it("times", function() {

        var i = 0;

        // 0 + 1 + 2
        (3).times(function(n) {
            i += n;
        });

        expect(i).toEqual(3);
    });

    it("upTo", function() {

        var i = 0;

        // 3, 4, 5
        (3).upTo(6).each(function(n) {

            i += n;
        });

        expect(i).toEqual(12);
    });

    it("range", function() {

        expect((3).range()).toEqual([0,1,2]);
        expect((-1).range()).toEqual([]);
    });

    it("toString", function() {
        expect((3).toString()).toEqual("3");
        expect((3).toString("f_")).toEqual("f_3");
    });

});