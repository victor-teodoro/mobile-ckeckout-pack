app.controller('apiKeyCtrl', ['$scope', 'apiKeyService', function($scope, apiKeyService) {
    $scope.showOkMsg = false;
    $scope.showApiKeyMsg = false;
    $scope.showEncKeyMsg = false;

    $scope.apiKey = "ak_test_jUC8l5YGoIX34M8IMYSmG7Sd8YcUkH";
    $scope.encryptionKey = "ek_test_G84bs5wa355FioxHAC00lGUe1f1p4O";    

    $scope.success = function() {
	apiKeyService.addApiKey($scope.apiKey);
	apiKeyService.addEcryptionKey($scope.encryptionKey);
	console.log(apiKeyService.getApiKey());
	console.log(apiKeyService.getEncryptionKey());
	$scope.showOkMsg = true;
    }    
}]);
