app.controller('apiKeyCtrl', ['$scope', 'apiKeyService', function($scope, apiKeyService) {
    $scope.showOkMsg = false;
    $scope.showApiKeyMsg = false;
    $scope.showEncKeyMsg = false;

    $scope.apiKey = "";
    $scope.encryptionKey = "";    

    $scope.success = function() {
	apiKeyService.addApiKey($scope.apiKey);
	apiKeyService.addEcryptionKey($scope.encryptionKey);
	console.log(apiKeyService.getApiKey());
	console.log(apiKeyService.getEncryptionKey());
	$scope.showOkMsg = true;
    }    
}]);
