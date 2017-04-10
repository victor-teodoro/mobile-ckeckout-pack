app.controller('headerCtrl', ['$scope', 'styleService', function($scope, styleService) {
    // Getters das cores
    $scope.getHeaderColor = function () {
	return styleService.getHeaderColor();
    };
}]);
