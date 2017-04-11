app.controller('metadataCtrl', ['$scope', 'styleService', function($scope, styleService) {
    // Getters e setters das cores
    $scope.getBackgroundColor = function () {
	return styleService.getBackgroundColor();
    };
    $scope.getHeaderColor = function () {
	return styleService.getHeaderColor();
    };
    
    // Vetores que guardam as chaves e os valores dos metadatas
    $scope.metadataKeys = [];
    $scope.metadataValues = [];

    // Objeto com os metadados
    $scope.metadata = {};

    $scope.saveMetadata = function() {
	for(var i = 0; i <= $scope.numOfMetadata; ++i) {
	    $scope.metadata[$scope.metadataKeys[i]] = $scope.metadataValues[i];
	}
    };

    // Número de metadatas e Inc e Dec
    $scope.numOfMetadata = 0;
    $scope.addMetadata = function() {
	$scope.numOfMetadata += 1;
    };
    $scope.removeMetadata = function() {
	if($scope.numOfMetadata <= 0){
	    $scope.numOfMetadata = 0;
	}
	else $scope.numOfMetadata -= 1;
    };

    // Emula o funciomento de range em Python
    $scope.range = function(min, max, step) {
	step = step || 1;
	var input = [];
	for (var i = min; i <= max; i += step) {
            input.push(i);
	}
	return input;
    };
}]);
