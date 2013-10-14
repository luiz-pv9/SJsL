describe("Util / Authorization / Base", function() {

	var Ability = null;
	var user = {role: "manager", id: 3};

	beforeEach(function() {

		Ability = new SJsL.Authorization(user);

		Ability.setRules(function(user) {

			this.can.read("Projects", function(projeto) {

				if(user.role === 'admin') {

					return true;
				}
				else {

					return projeto.type !== 'Apple';
				}
			});

			if(user.role === "manager") {

				this.can.create("Projects");
				this.can.edit("Projects", function(projeto) {

					return projeto.managerId  === user.id;
				});
			}

			this.can.manage("Dogs");
			this.can.manage("Phones", function(demanda) {

				if(user.role === 'admin') {

					return true;
				}
				else {

					return demanda.type !== 'Apple';
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

		expect(user.can.read("Projects")).toBe(true);
		expect(user.can.read("Projects", {type: "Apple"})).toBe(false);
		expect(user.can.create("Projects")).toBe(true);
		expect(user.can.edit("Projects", {managerId: 3})).toBe(true);
		expect(user.can.edit("Projects", {managerId: 4})).toBe(false);
		expect(user.can.edit("Dogs")).toBe(true);
		expect(user.can.delete("Dogs")).toBe(true);
		expect(user.can.read("Dogs")).toBe(true);
		expect(user.can.read("Phones")).toBe(true);
		expect(user.can.read("Phones", {type: "Apple"})).toBe(false);
	});

	describe("Custom actions", function() {

		var _user = null;
		var _auth = null;

		beforeEach(function() {
			_user = {role: "manager"};
			_auth = new SJsL.Authorization(_user);
		});

		it("adds a new element to the hash", function() {

			_auth.addAction("commit");
			_auth.setRules(function(user){

				this.can.commit("Code");	
				this.can.commit("Tag", function(tag) {
					return tag.name !== "foo";
				});

				this.can.manage("Cats"); // Manage will also allow actions created by the user
			});

			expect(_user.can.commit("Code")).toBe(true);
			expect(_user.can.commit("Tag")).toBe(true);
			expect(_user.can.commit("Tag", {name: "foo"})).toBe(false);
			expect(_user.can.commit("Cats")).toBe(true);
		});

	});

	describe("Generics subjects", function() {

		var _user = null;
		var _auth = null;

		beforeEach(function() {
			_user = {role: "manager"};
			_auth = new SJsL.Authorization(_user);
		});

		it("adds a new element to the hash", function() {

			_auth.setRules(function(user){

				this.can.read("all");
				this.can.create("none");

			});

			expect(_user.can.read("Cats")).toBe(true);
			expect(_user.can.create("Documents")).toBe(false);
		});

	});

});