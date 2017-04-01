app.directive("paymentMethod", function() {
    return {
        templateUrl : "directives/views/payment_methods.html",
	controller: 'paymentMethodCtrl',
	scope: {
	    isCheckout: "=",
	    numOfCards: "=",
	    paymentMethods: "=",
	    pay: "=",
	    price: '=',
	    amountPerMethod: '='
	}
    };
});
