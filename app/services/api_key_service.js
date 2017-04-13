app.service('apiKeyService', ['$cookies', function($cookies) {
    this.apiKey = $cookies.get('apiKey') || "ak_test_Vuemp95WIABMbPCDSd75CuRolVIZBk";
    this.encryptionKey = $cookies.get('encryptionKey') || "ek_test_81kzRKpg3fao6R6raOVQNwwBEWFnl3";    
    

    // Getters and setters
    this.addApiKey = function(apiKey) {
	this.apiKey = apiKey;
	$cookies.put('apiKey', apiKey);
    };
    this.getApiKey = function(){
	return this.apiKey;
    };

    this.addEcryptionKey = function(encryptionKey) {
	this.encryptionKey = encryptionKey;
	$cookies.put('encryptionKey', encryptionKey);
    };
    this.getEncryptionKey = function(){
	return this.encryptionKey;
    };
}]);
