app.directive("recipients", function() {
    return {
        templateUrl : "directives/views/recipients.html",
	controller: 'recipientsCtrl',
	scope: {
	    buildSplitRules: '=',
	    splitRules: '=',
	    isAmount: '=',
	    updateRecipients: '='
	}
    };
});
