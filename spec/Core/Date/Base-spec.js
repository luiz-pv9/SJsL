describe("Core / Date / Base", function() {

	it("clearTime", function() {
		var date = new Date();
		var time = date.getTime();
		date.clearTime();
		var time2 = date.getTime();
		expect(time).not.toEqual(time2);
	});

	it("today", function() {
		expect(Date.today()).toEqual(new Date().clearTime());
	});

	describe("parser", function() {

		var parser = null;

		beforeEach(function() {
			parser = Date.parser('%d/%m/%Y');
		});

		it("parse", function() {
			console.log(parser.parse('30/08/1993'));
			expect(parser.parse('30/08/1993').getTime()).toBeTruthy();
			expect(parser.parse('30/cow/1993')).toEqual(null);
		});
	});

	describe("upTo", function() {

		var parser = Date.parser('%d/%m/%Y');
		var date1 = parser.parse('30/08/1993');


		it("diff", function() {
			var date2 = date1.next().day();

			expect(
				date1.upTo(date2).diff().in.hours()
			).toEqual(24);

			expect(
				date1.upTo(date2).diff().in.days()
			).toEqual(1);
		});

		it("range", function() {

			expect(
				date1.upTo(date1.next().month()).range().by.days(1).length
			).toEqual(32);

			expect(
				date1.upTo(date1.next().month()).range().by.days(7).length
			).toEqual(5);

			expect(
				date1.upTo(date1.next().year()).range().by.months(1).length
			).toEqual(12);
		});
	});

	it("is", function() {
		var date = Date.parser('%d/%m/%Y').parse('30/08/2013');
		expect(date.is().friday()).toEqual(true);
		expect(date.is().monday()).toEqual(false);
	});

	it("add", function() {
		var parser = Date.parser('%d/%m/%Y');
		var date = parser.parse('30/08/2013');
		expect(date.add().days(1)).toEqual(parser.parse('31/08/2013'));
		expect(date.add().days(2)).toEqual(parser.parse('01/09/2013'));
		expect(date.add().months(1)).toEqual(parser.parse('30/09/2013'));
	});

	it("format", function() {

		SJsL.defaultLanguage = "pt";

		var day = Date.parser('%d/%m/%Y').parse('30/08/2013');
		expect(day.format('%d')).toEqual('30');
		expect(day.format('%m')).toEqual('8');
		expect(day.format('%M')).toEqual('08');
		expect(day.format('%w')).toEqual('Sex');
		expect(day.format('%W')).toEqual('Sexta-feira');
		expect(day.format('%y')).toEqual('13');
		expect(day.format('%Y')).toEqual('2013');
		expect(day.format('%D')).toEqual('30');
		expect(day.format('%d de %O')).toEqual('30 de Agosto');
	});

	it("next", function() {

		var parser = Date.parser('%d/%m/%Y');
		var day = parser.parse('30/08/2013');

		expect(day.next().day()).toEqual(parser.parse('31/08/2013'));
		expect(day.next().day(2)).toEqual(parser.parse('01/09/2013'));
		expect(day.next().month()).toEqual(parser.parse('30/09/2013'));
		expect(day.next().monday()).toEqual(parser.parse('02/09/2013'));

		// `day` is a friday
		expect(day.next().monday().previous().friday()).toEqual(day);
	});

});