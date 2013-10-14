;(function(SJsL) {

	SJsL.ShuntingYard = function(expression) {

		expression = expression.replace(/[\[{]/g, "(");
		expression = expression.replace(/[\]}]/g, ")");
		expression = expression.replace(/ /g, "");

		var stack = [];
		var stage = [];

		// To extend the functionality of the operators change this function
		this.match = function(num1, num2, operator) {
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

		this.calculate = function() {

			stack = [];
			stage = [];

			for(var i = 0; i < expression.length; i++) {

				var currentToken = expression[i];
				// We're dealing with a number, peek the next until the number ends
				if(currentToken === '0' || +currentToken) {

					var j = i;
					while(+expression[++j] || expression[j] === '0' || expression[j] === '.' || expression[j] === ',') {
						currentToken += expression.charAt(j);
					}
					i = j - 1; // Off by one Bug
				}

				if(+currentToken) {

					stage.push(+currentToken);
				}
				else {

					if(currentToken === ')') {

						var lastStack = null;
						do {
							lastStack = stack.pop();
							if(lastStack !== '(') {

								stage.push(lastStack);
							}
						} while(lastStack !== '(');
					}
					else {
						
						stack.push(currentToken);
					}
				} // if(+currentToken)
			} // for i in expression.length

			while(stack.length > 0) {
				stage.push(stack.pop());
			}

			var results = SJsL.shallowClone(stage).reverse();
			stack = [];
			stage = [];

			do {

				var token = results.pop();

				if(+token) {

					stack.push(token);
				}
				else {

					var num2 = stack.pop();
					var num1 = stack.pop();

					var result = this.match(+num1, +num2, token);
					stack.push(result);
				}

			} while(results.length > 0);

			return stack.pop();
		} // calculate
	}


	SJsL.FormulaWithVariable = function(formula) {

		this.originalFormula = formula;

		this.calculate = function(values) {

			var formula = this.originalFormula;
			values.keys().each(function(key) {
				var value = values[key];
				formula = formula.replace(key, value);
			});
			return new SJsL.ShuntingYard(formula).calculate();
		}
	}

})(SJsL);