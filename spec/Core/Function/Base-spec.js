describe("Core / Function / Base", function() {

    it("runOnce", function() {
        var i = 0;
        var increment = function() {
            i += 1;
        }

        incrementOnce = SJsL.runOnce(increment);

        expect(i).toEqual(0);
        incrementOnce();
        expect(i).toEqual(1);
        incrementOnce();
        expect(i).toEqual(1);
        increment();
        expect(i).toEqual(2);
        incrementOnce();
        expect(i).toEqual(2);
    });

});