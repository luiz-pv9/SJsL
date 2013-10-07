describe("Util / ShuntingYard / Base", function() {

    it("exists", function() {
        expect(SJsL.ShuntingYard).toBeTruthy();
        expect(new SJsL.ShuntingYard("")).toBeTruthy();
    });

    it("digests", function() {
        expect(
            new SJsL.ShuntingYard("3+2").calculate()
        ).toEqual(5);

        expect(
            new SJsL.ShuntingYard("3+2+1").calculate()
        ).toEqual(6);

        expect(
            new SJsL.ShuntingYard("(3+2+1)").calculate()
        ).toEqual(6);

        expect(
            new SJsL.ShuntingYard("(3+2)+1").calculate()
        ).toEqual(6);

        expect(
            new SJsL.ShuntingYard("[3+2]+1").calculate()
        ).toEqual(6);

        expect(
            new SJsL.ShuntingYard("(3+2)*2").calculate()
        ).toEqual(10);

        expect(
            new SJsL.ShuntingYard("((3+2)*2)/2").calculate()
        ).toEqual(5);

        expect(
            new SJsL.ShuntingYard("(((3+2)*2)/2)^2").calculate()
        ).toEqual(25);

        expect(
            new SJsL.ShuntingYard("(((3+2)*2)/2)^2").calculate()
        ).toEqual(25);

        expect(
            new SJsL.ShuntingYard("3.2+2").calculate()
        ).toEqual(5.2);

        expect(
            new SJsL.ShuntingYard("3.2123+2.2").calculate()
        ).toEqual(5.4123);

        expect(
            new SJsL.ShuntingYard("[(((3+2)*2)/2)^2]^0.5").calculate()
        ).toEqual(5);
    });

    describe("FormulaWithVariable", function() {

        var formula = new SJsL.FormulaWithVariable("(3 + e) * f");
        expect(formula.calculate({
            e: 2,
            f: 2
        })).toEqual(10);

        formula = new SJsL.FormulaWithVariable("a ^ b");
        expect(formula.calculate({
            a: 5,
            b: 2
        })).toEqual(25);

        formula = new SJsL.FormulaWithVariable("a ^ b");
        expect(formula.calculate({
            a: 25,
            b: 0.5
        })).toEqual(5);

    });

});