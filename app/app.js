var app = angular.module("mobileCheckoutApp", ["ngRoute", 'ngCookies']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
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
	    });
}]);

// Changes the hash bang routing
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
