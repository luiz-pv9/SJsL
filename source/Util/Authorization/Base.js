;(function(SJsL) {

	// --------------------------------------------------------------
	// Authorization plugin inspired by Ruby on Rails' cancan (ryanb)
	// --------------------------------------------------------------

	SJsL.Authorization = function(user) {

		var self = this;
		this.user = user;

		this.addAction = function(action) {

			this.permissions = this.permissions || {};
			this.can = this.can || {};

			this.permissions[action] = [];

			this.can[action] = function(subject, fn) {

				self.permissions[action].push({
					subject: subject,
					fn: fn
				});
			}
		}

		// There are 4 default actions: read, edit, create, delete and manage.
		// Manage is simply a helper that calls the other four(read, edit, create and delete)
		// for the subject passed.
		this.can = {

			read: function(subject, fn) {

				self.permissions.read.push({
					subject: subject,
					fn: fn 
				});
			},

			edit: function(subject, fn) {

				self.permissions.edit.push({
					subject: subject,
					fn: fn 
				});
			},

			create: function(subject, fn) {

				self.permissions.create.push({
					subject: subject,
					fn: fn 
				});
			},

			delete: function(subject, fn) {

				self.permissions.delete.push({
					subject: subject,
					fn: fn 
				});
			},

			manage: function(subject, fn) {

				var self = this;
				this.keys().each(function(key) {

					if(key !== 'manage') { // Prevent infinite stack call

						self[key](subject, fn);
					}
				});
			}
		};

		// This is the hash that will be filled after the user calls the setRules.
		// It will search for a subject and and allow actions (or not).
		this.permissions = {
			read:   [],
			edit:   [],
			create: [],
			delete: [],
			manage: []
		};

		this.setRules = function(fn) {

			var self = this;
			fn.call(this, this.user);
			this.user.can = {}; // The 'can' hash is added to the user object passed in the constructor.

			self.permissions.keys().each(function(key) {

				var rules = self.permissions[key];

				self.user.can[key] = function(subject, instance) {

					var rule = rules.find(function(rule) {

						return rule.subject === subject;
					});

					// If there is an "all" in any of the actions (read, edit, etc)
					// Allow everything for that action
					if(rules.find(function(rule) {

						return rule.subject.toLowerCase() === 'all';
					})) { return true; }

					// If there is a "none" in any of the actions (read, edit, etc)
					// Deny everything for that action (oposite of all)
					if(rules.find(function(rule) {

						return rule.subject.toLowerCase() === 'none';
					})) { return false; }



					if(rule) {

						if(rule.fn) {

							if(instance) {

								if(rule.fn(instance)) {

									return true;
								}
								else {

									return false;
								}
							}
							else {

								return true;
							}
						}
						else {

							return true;
						}
					}
					else {

						return false;
					}
				}
			});
		}
	}


})(SJsL);
