describe("Util / Authorization / Base", function() {

	var Ability = null;
	var user = {role: "manager", id: 3};

	beforeEach(function() {
		
		Ability = new SJsL.Authorization(user);

		Ability.setRules(function(user) {

			this.can.read("Projetos", function(projeto) {

				if(user.role === 'admin') {

					return true;
				}
				else {

					return projeto.tipo !== 'Funcional';
				}
			});

			if(user.role === "manager") {

				this.can.create("Projetos");
				this.can.edit("Projetos", function(projeto) {

					return projeto.managerId  === user.id;
				});
			}

			this.can.manage("Crs");
			this.can.manage("Demandas", function(demanda) {

				if(user.role === 'admin') {

					return true;
				}
				else {

					return demanda.tipo !== 'Funcional';
				}
			});
		});
	});


	it("exists", function() {
	   expect(user).toBeTruthy();
	})

	it("has a can object", function() {
		expect(user.can).toBeTruthy();
	});

	it("authorizes the user", function() {

		expect(user.can.read("Projetos")).toBe(true);
		expect(user.can.read("Projetos", {tipo: "Funcional"})).toBe(false);
		expect(user.can.create("Projetos")).toBe(true);
		expect(user.can.edit("Projetos", {managerId: 3})).toBe(true);
		expect(user.can.edit("Projetos", {managerId: 4})).toBe(false);
		expect(user.can.edit("Crs")).toBe(true);
		expect(user.can.delete("Crs")).toBe(true);
		expect(user.can.read("Crs")).toBe(true);
		expect(user.can.read("Demandas")).toBe(true);
		expect(user.can.read("Demandas", {tipo: "Funcional"})).toBe(false);
	});
});