app.controller('homeCtrl', ['$scope', 'styleService', '$cookies', '$window', function($scope, styleService, $cookies, $window) {
    $scope.backgroundColor = "";
    $scope.headerColor = "";
    $scope.ciaLogoURL = "";
    $scope.ciaLogoURLTemp = "";
    
    // Getters e setters das cores
    $scope.save = function () {
	// Save logo and color
	if($scope.ciaLogoURLTemp){
	    $scope.ciaLogoURL = $scope.ciaLogoURLTemp;
	    $cookies.put('ciaLogoURL', $scope.ciaLogoURL);
	}
	
	if($scope.headerColor)
	    styleService.setHeaderColor($scope.headerColor);

	// Refresh the window
	$window.location.reload();
    };
    $scope.getBackgroundColor = function () {
	return styleService.getBackgroundColor();
    };
    $scope.getHeaderColor = function () {
	return styleService.getHeaderColor();
    };
}]);
