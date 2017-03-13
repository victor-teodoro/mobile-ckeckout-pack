app.service('paymentService', ['$http', 'apiKeyService', function($http, apiKeyService) {
    // Pagar só com cartão
    this.checkout_card = function (numOfCards, price, metadata, splitRules) {
	// Divide o dinheiro entre os cartões
	sharedPrice = price/numOfCards;
	
	// INICIAR A INSTÂNCIA DO CHECKOUT
        var checkout = new PagarMeCheckout.Checkout({"encryption_key": apiKeyService.encryptionKey, success: function(data) {
            console.log(data);

	    var transaction_json = {
		"api_key": apiKeyService.apiKey,
		"amount": sharedPrice*100,
		"card_hash": data.card_hash,
		"capture": false,
		"split_rules": splitRules,
		"metadata": metadata
	    };

	    return $http.post('https://api.pagar.me/1/transactions', transaction_json)
		.then(function successCallback (response) {
		    console.log(response.data);
		    
		    numOfCards -= 1;
		    if(numOfCards > 0) {
			console.log(numOfCards);
			checkout_card(numOfCards, price, metadata, splitRules);
		    }
		    
		}, function errorCallback (failure) {
		    console.log("failed : ", failure);
		});				
        }});

        // DEFINIR AS OPÇÕES
        // e abrir o modal
        var params = {
	    "customerData":"false",
	    "amount": sharedPrice*100,
	    "createToken": "false",
	    "maxInstallments": "12",
	    "paymentMethods": "credit_card",
	    "interestRate": "0",
	    "uiColor": "#000000"
	};
	
        checkout.open(params);	    
    };
}]);
