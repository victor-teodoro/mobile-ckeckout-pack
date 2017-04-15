app.controller('headerCtrl', ['$scope', 'styleService', '$cookies', function($scope, styleService, $cookies) {
    // Getters das cores
    $scope.getHeaderColor = function () {
	return styleService.getHeaderColor();
    };

    $scope.ciaLogoURL = $cookies.get('ciaLogoURL') || "images/logo.png";
}]);
