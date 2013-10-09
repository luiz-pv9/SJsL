describe("Util / Unique / Base", function() {

    it("exists", function() {
        expect(SJsL.generateId()).toBeTruthy();
    });

    it("setBaseId & generateId", function() {

        SJsL._resetId();
        SJsL.setBaseId(3);

        expect(SJsL.generateId()).toBe(4);
        expect(SJsL.generateId()).toBe(5);
        // Prefix
        expect(SJsL.generateId("f")).toBe("f6");
        expect(SJsL.generateId()).toBe(7);
        SJsL.setBaseId(13);
        expect(SJsL.generateId()).toBe(14);
        SJsL.setBaseId(8);
        expect(SJsL.generateId()).toBe(15);
    });

});