app.controller('homeCtrl', ['$scope', 'styleService', function($scope, styleService) {
    $scope.backgroundColor = "";
    $scope.headerColor = "";
    
    // Getters e setters das cores
    $scope.saveColors = function () {
	styleService.setHeaderColor($scope.headerColor);
	styleService.setBackgroundColor($scope.backgroundColor);
    };
    $scope.getBackgroundColor = function () {
	return styleService.getBackgroundColor();
    };
    $scope.getHeaderColor = function () {
	return styleService.getHeaderColor();
    };
}]);
