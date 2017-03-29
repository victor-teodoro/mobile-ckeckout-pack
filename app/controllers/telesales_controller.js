app.controller('telesalesCtrl', ['$scope', '$http', 'apiKeyService', function($scope, $http, apiKeyService) {
    // Controla o que é mostrado
    $scope.chktSuccess = false;
    $scope.linkSuccess = false;

    /********************************************************************************
     * Daqui pra baixo estão as funções que lidam com o processamento dos pagamentos
     * Idealmente estariam num service ou outro controller, se você estiver usando
     * outro framwework que não Angular 
     *******************************************************************************/
    
    $scope.openCheckout = function(price) {
	// INICIAR A INSTÂNCIA DO CHECKOUT
        var checkout = new PagarMeCheckout.Checkout({"encryption_key": apiKeyService.encryptionKey, success: function(data) {
            console.log(data);

	    var transaction_json = {
		"api_key": apiKeyService.apiKey,
		"amount": price*100,
		"card_hash": data.card_hash
	    };

	    $http.post('https://api.pagar.me/1/transactions', transaction_json)
		.then(function successCallback (response) {
		    console.log(response.data);
		    $scope.chktSuccess = true;
		}, function errorCallback (failure) {
		    console.log("failed : ", failure);
		});				
        }});

        // DEFINIR AS OPÇÕES
        // e abrir o modal
        var params = {
	    "customerData":"false",
	    "amount": price*100,
	    "createToken": "false",
	    "maxInstallments": "12",
	    "paymentMethods": "credit_card",
	    "interestRate": "0",
	    "uiColor": "#000000"
	};
	
        checkout.open(params);	    
    };

    $scope.sendEmail = function() {
	$http.get('https://pagarme-email-api.herokuapp.com/')
	    .then(function successCallback (response) {
		console.log(response.data);

		$scope.linkSuccess = true;		
	    }, function errorCallback (failure) {
		console.log("failed : ", failure);
	    });	
    }
}]);

