describe("Core / Number / Base", function() {

    var N = SJsL.N;

    it("times", function() {

        var i = 0;

        // 0 + 1 + 2
        N.times(3, function(n) {
            i += n;
        });

        expect(i).toEqual(3);
    });

    it("upTo", function() {

        var i = 0;

        // 3, 4, 5
        var arr = N.upTo(3, 6);
        expect(arr.length).toEqual(3);
        expect(arr[0]).toEqual(3);
    });

    it("range", function() {

        expect(N.range(3)).toEqual([0, 1, 2]);
        expect(N.range(-1)).toEqual([]);
    });

    it("toString", function() {
        expect(N.toString(3)).toEqual("3");
        expect(N.toString(3, "f_")).toEqual("f_3");
    });

});