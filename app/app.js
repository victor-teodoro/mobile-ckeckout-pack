var app = angular.module("standardWebDemoApp", ["ngRoute", 'ngCookies']);

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
	    controller: 'telesalesCtrl'
	})
	.when("/subscriptions", {
	    templateUrl: "views/subscriptions.html",
	    controller: 'subscriptionsCtrl'
	})
	.when("/multiplus/troque_pontos", {
	    templateUrl: "views/multiplus.html",
	    controller: 'multiplusCtrl'
	})
	.when("/multiplus/clube", {
	    templateUrl: "views/multiplus.html",
	    controller: 'multiplusCtrl'
	})
	.when("/multiplus/compre_pontos", {
	    templateUrl: "views/multiplus.html",
	    controller: 'multiplusCtrl'
	    })
	.when("/telesales_checkout", {
	    templateUrl: "views/telesalescheckout.html",
	    controller: 'telesalesCtrl'
	});
}]);

// Changes the hash bang routing
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
