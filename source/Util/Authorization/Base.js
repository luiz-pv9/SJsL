;(function(SJsL) {

	SJsL.Authorization = function(data) {

		var self = this;
		this.user = data;

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

				this.read(subject, fn);
				this.edit(subject, fn);
				this.create(subject, fn);
				this.delete(subject, fn);
			}
		};

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
			this.user.can = {};

			self.permissions.keys().each(function(key) {

				var rules = self.permissions[key];

				self.user.can[key] = function(subject, instance) {

					var rule = rules.find(function(rule) {

						return rule.subject === subject;
					});

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
