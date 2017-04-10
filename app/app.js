var app = angular.module("standardWebDemoApp", ["ngRoute"]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
	.when("/", {
	    templateUrl : "views/home.html",
	    controller: 'homeCtrl'
	})
	.when("/api_key", {
	    templateUrl : "views/api_key.html",
	    controller: 'apiKeyCtrl'
	})
	.when("/checkout", {
	    templateUrl : "views/checkout.html",
	    controller: 'checkoutCtrl'
	})
	.when("/marketplace", {
	    templateUrl : "views/marketplace.html",
	    controller: 'marketplaceCtrl'
	})
	.when("/telesales", {
	    templateUrl : "views/telesales.html",
	    controller: 'telesalesCtrl'
	})
	.when("/login", {
	    templateUrl : "views/login.html",
	    controller: 'loginCtrl'
	})
	.when("/subscriptions", {
	    templateUrl: "views/subscriptions.html",
	    controller: 'subscriptionsCtrl'
	});
}]);

// Changes the hash bang routing
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
