;(function(SJsL) {

	var Action = function(commit, rollback) {

		this.id = SJsL.generateId();
		this.data = {};
		this.performed = true;

		this.rollback = function() {

			return rollback.call(this);
		}

		// Run the commit function
		commit.call(this);
	}

	SJsL.ActionStack = function(name) {

		this.name = name;
		this.actionStack = [];

		this.registerAction = function(name, fn) {

			this.actions[name] = fn;
		}

		this.actions = {

			'changeTextValue': function(text) {

				var commit = function() {

					this.data["previous"] = text;
				};

				var rollback = function() {

					return this.data["previous"];
				};
				return new Action(commit, rollback);
			},

			'changeObjectProperty': function(object) {

				var commit = function() {

					this.data["previous"] = object.shallowClone();
				};

				var rollback = function() {

					var diff = {};
					var self = this;
					object.keys().each(function(key) {

						if(object[key] !== self.data["previous"][key]) {

							diff[key] = self.data["previous"][key];
						}
					});
					return diff;
				};
				return new Action(commit, rollback);
			},

			'changeObjectProperty!': function(object) {

				var commit = function() {

					this.data["previous"] = object.shallowClone();
				};

				var rollback = function() {

					var self = this;
					object.keys().each(function(key) {

						if(object[key] !== self.data["previous"][key]) {

							object[key] = self.data["previous"][key];
						}
					});
					return object;
				};
				return new Action(commit, rollback);
			}
		};

		this.addAction = function(action) {

			this.actionStack.push(action);
		}

		this.undo = function() {

			return this.actionStack.pop().rollback();
		}
	}

})(SJsL);