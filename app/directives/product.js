app.directive("product", function() {
    return {
        templateUrl : "directives/views/product.html",
	controller: 'productCtrl',
	scope: {
	    price: "=",
	    productId: "=productId"
	}
    };
});
