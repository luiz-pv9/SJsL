// SJsLDirectives.directive("kudo", [function() {

// 	var templateSmile = [
// 	].join(" ");

// 	var templateStar = [
// 	].join(" ");

// 	var templates = {
// 		'smile': templateSmile,
// 		'star': templateStar
// 	};

// 	return {

// 		restrict: 'E',
// 		scope: {

// 			afterHover : '=',
// 			afterFinish: '=',
// 			afterBlur  : '=',
// 			hoverTime  : '@'
// 		},
// 		link: function(scope, elem, attrs) {

// 			var countdown;
// 			elem.hover(function() {

// 				if(scope.afterHover) { scope.afterHover(); }

// 				// TODO: Animate
// 				countdown = setTimeout(function() {

// 					if(scope.afterFinish) { scope.afterFinish(); }

// 				}, scope.hoverTime);
// 			});

// 			elem.blur(function() {

// 				if(scope.afterBlur) { scope.afterBlur(); }
// 				clearTimeout(countdown);
// 				// TODO: Reset animation
// 			});
// 		}
// 	}

// }]);