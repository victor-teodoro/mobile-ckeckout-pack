app.controller('subscriptionsCtrl', ['$scope', '$http', 'paymentService', 'apiKeyService', 'styleService', function($scope, $http, paymentService, apiKeyService, styleService) {
    // Getters e setters das cores
    $scope.getBackgroundColor = function () {
	return styleService.getBackgroundColor();
    };
    $scope.getHeaderColor = function () {
	return styleService.getHeaderColor();
    };
    
    $scope.showOkMsg = false;

    /**********************************************
     Variáveis que lidam com a transação
    *********************************************/
    $scope.isCheckout = false;
    $scope.tids = []; // Guarda os ids das transações para captura

    $scope.pay = function(paymentMethod) {
	// Registra os metadados digitados
	$scope.saveMetadata();
	$scope.buildSplitRules();

	console.log(paymentMethod);
	console.log($scope.paymentMethods);
	if(paymentMethod === $scope.paymentMethods.credit_card) {
	    // Não usa boleto
	    var usesBoleto = false;
	    // Calcula o preço por cartão
	    var sharedPrice = ($scope.price/$scope.numOfCards).toFixed(2);
	    // Paga só com cartões
	    $scope.checkout_card($scope.numOfCards, usesBoleto, sharedPrice, $scope.metadata, $scope.splitRules);
	} else if(paymentMethod === $scope.paymentMethods.credit_card_and_boleto) {
	    // Usa boleto
	    var usesBoleto = true;
	    // Calcula o preço por cartão
	    var sharedPrice = ($scope.price/($scope.numOfCards + 1)).toFixed(2);
	    // Paga só com cartões
	    $scope.checkout_card($scope.numOfCards, usesBoleto, sharedPrice, $scope.metadata, $scope.splitRules);
	} else if(paymentMethod === $scope.paymentMethods.boleto) {
	    $scope.createBoleto($scope.price, $scope.splitRules);
	}
    };


    /********************************************************************************
     * Daqui pra baixo estão as funções que lidam com o processamento dos pagamentos
     * Idealmente estariam num service ou outro controller, se você estiver usando
     * outro framwework que não Angular 
     *******************************************************************************/
    
    // Pagar só com cartão
    $scope.checkout_card = function (numOfCards, usesBoleto, price, metadata, splitRules) {
	// INICIAR A INSTÂNCIA DO CHECKOUT
        var checkout = new PagarMeCheckout.Checkout({"encryption_key": apiKeyService.encryptionKey, success: function(data) {
            console.log(data);

	    var transaction_json = {
		"api_key": apiKeyService.apiKey,
		"amount": price*100,
		"card_hash": data.card_hash,
		"capture": false,
		"split_rules": splitRules,
		"metadata": metadata
	    };

	    console.log(transaction_json);

	    $http.post('https://api.pagar.me/1/transactions', transaction_json)
		.then(function successCallback (response) {
		    console.log(response.data);
		    
		    numOfCards -= 1;
		    if(response.data.status === "authorized" && numOfCards === 0 && usesBoleto === false) {
			console.log("# de Cartões: " + numOfCards);
			$scope.tids.push(response.data.tid);
			$scope.captureCards($scope.tids);
		    } else if(response.data.status === "authorized" && numOfCards === 0 && usesBoleto === true) {
			$scope.createBoleto(price);			
		    } else if(response.data.status != "authorized") {
			alert("Cartão não aprovado.");
		    }
		    
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
	    "uiColor": $scope.getHeaderColor()
	};

	console.log($scope.getHeaderColor());
        checkout.open(params);	    
    };

    // Cria um boleto
    $scope.createBoleto = function(price, splitRules) {
	var transaction_json = {
	    "api_key": apiKeyService.apiKey,
	    "payment_method": "boleto",
	    "amount": price*100,
	    "split_rules": splitRules
	};	    

	$http.post('https://api.pagar.me/1/transactions/', transaction_json)
	    .then(function successCallback (response) {
		console.log(response.data);
		// Vai pra página de confirmação
		$scope.showOkMsg = true;
		alert("Sua transação só será confirmada após o pagamento do boleto.");
	    }, function errorCallback (failure) {
		console.log("failed : ", failure);
	    });

	
    };

    // Captura os cartões que foram aprovados
    $scope.captureCards = function(tids) {
	var transaction_json = {
	    "api_key": apiKeyService.apiKey
	};

	$http.post('https://api.pagar.me/1/transactions/' + tids.pop() + '/capture', transaction_json)
	    .then(function successCallback (response) {
		console.log(response.data);
		if(tids.length > 0) $scope.captureCards(tids);
	    }, function errorCallback (failure) {
		console.log("failed : ", failure);
	    });

	// Vai pra página de confirmação
	$scope.showOkMsg = true;
    };
}]);
