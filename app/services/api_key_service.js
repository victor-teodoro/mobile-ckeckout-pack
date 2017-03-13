app.service('apiKeyService', function() {
    this.apiKey = "ak_test_jUC8l5YGoIX34M8IMYSmG7Sd8YcUkH";
    this.encryptionKey = "ek_test_G84bs5wa355FioxHAC00lGUe1f1p4O";

    this.addApiKey = function(apiKey) {
	this.apiKey = apiKey;
    };
    this.getApiKey = function(){
	return this.apiKey;
    };

    this.addEcryptionKey = function(encryptionKey) {
	this.encryptionKey = encryptionKey;
    };
    this.getEncryptionKey = function(){
	return this.encryptionKey;
    };
});
