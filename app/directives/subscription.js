app.directive("subscription", function() {
    return {
        templateUrl : "directives/views/subscription.html",
	controller: 'subscriptionCtrl',
	scope: {
	    showOkMsg: '=message',
	    saveMetadata: '=',
	    metadata: '='
	}
    };
});
