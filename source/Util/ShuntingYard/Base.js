;(function(SJsL) {

	SJsL.ShuntingYard = function(expression) {

		var stack = [];
		var stage = [];

		// To extend the functionality of the operators change this function
		this.calculate = function(num1, num2, operator) {
			switch(operator) {
				case '+':
					return num1 + num2;
				case '-':
					return num1 - num2;
				case '/':
					return num1 / num2;
				case '*':
					return num1 * num2;
				case '^':
					return Math.pow(num1, num2);
				case '%':
					return num1 % num2;
			}	
			return 0;
		}

		this.digest = function() {

			stack = [];
			stage = [];

			for(var i = 0; i < expression.length; i++) {

				var currentToken = expression[i];
				// We're dealing with a number, peek the next until the number ends
				if(+currentToken) {

					var j = i;
					while(+expression[++j] || expression[++j] === '.' || expression[++j] === ',') {

						currentToken += expression[j];
					}
					i = j - 1; // Off by one Bug
				}


				if(+currentToken) {

					stage.push(currentToken);
				}
				else {

					if(currentToken === ')') {

						var lastStack = stack.pop();
						if(lastStack !== '(') {

							stage.push(lastStack);
						}
					}
					else {
						
						stack.push(currentToken);
					}
				} // if(+currentToken)
			} // for i in expression.length

			while(stack.length > 0) {
				stage.push(stack.pop());
			}

			var results = SJsL.shallowClone(stage);
			stack = [];
			stage = [];

			do {

				var token = results.pop();

				if(+token) {

					stack.push(token);
				}
				else {

					var num1 = stack.pop();
					var num2 = stack.pop();
					var result = this.calculate(+num1, +num2, token);
					stack.push(result);
				}

			} while(results.length > 0);

			return stack.pop();
		} // digest
	}


	SJsL.FormulaWithVariable = function(formula) {

		this.calculate = function(values) {

			var formula = this.originalFormula;
			values.keys(function(key) {
				var value = values[key];
				formula.replace(key, value);
			});
			return new SJsL.ShuntingYard(formula).digest();
		}
	}

})(window.SJsL);