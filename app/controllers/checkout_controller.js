app.controller('checkoutCtrl', ['$scope', '$http', 'paymentService', 'apiKeyService', function($scope, $http, paymentService, apiKeyService) {
    // Controla a exibição do footer
    $scope.height = {
	'min-height': getHeight() + "px"
    };

    function getHeight() {
        return (window.innerHeight * .70);
    }
    // Mostra o depois da transação com ng-show
    $scope.showOkMsg = false;

    /**********************************************
     Variáveis que lidam com a transação
    *********************************************/
    $scope.isCheckout = true;    
    $scope.tids = []; // Guarda os ids das transações para captura

    $scope.pay = function(paymentMethod) {
	// Registra os metadados digitados
	$scope.saveMetadata();

	console.log(paymentMethod);
	console.log($scope.paymentMethods);
	if(paymentMethod === $scope.paymentMethods.credit_card) {
	    // Não usa boleto
	    var usesBoleto = false;
	    // Calcula o preço por cartão
	    var sharedPrice = ($scope.price/$scope.numOfCards).toFixed(2);
	    // Paga só com cartões
	    $scope.checkout_card($scope.numOfCards, usesBoleto, sharedPrice, $scope.metadata, null);
	} else if(paymentMethod === $scope.paymentMethods.credit_card_and_boleto) {
	    // Usa boleto
	    var usesBoleto = true;
	    // Calcula o preço por cartão
	    var sharedPrice = ($scope.price/($scope.numOfCards + 1)).toFixed(2);
	    // Paga só com cartões
	    $scope.checkout_card($scope.numOfCards, usesBoleto, sharedPrice, $scope.metadata, null);
	} else if(paymentMethod === $scope.paymentMethods.boleto) {
	    $scope.createBoleto($scope.price);
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

	    $http.post('https://api.pagar.me/1/transactions', transaction_json)
		.then(function successCallback (response) {
		    console.log(response.data);
		    
		    numOfCards -= 1;
		    if(response.data.status === "authorized" && numOfCards > 0) {
			console.log("# de Cartões: " + numOfCards);
			$scope.tids.push(response.data.tid);
			$scope.checkout_card(numOfCards, usesBoleto, price, metadata, splitRules);
		    } else if(response.data.status === "authorized" && numOfCards === 0 && usesBoleto === false) {
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
	    "uiColor": "#000000"
	};
	
        checkout.open(params);	    
    };

    // Cria um boleto
    $scope.createBoleto = function(price) {
	var transaction_json = {
	    "api_key": apiKeyService.apiKey,
	    "payment_method": "boleto",
	    "amount": price*100
	};	    

	$http.post('https://api.pagar.me/1/transactions/', transaction_json)
	    .then(function successCallback (response) {
		console.log(response.data);		
	    }, function errorCallback (failure) {
		console.log("failed : ", failure);
	    });
	
	// Vai pra página de confirmação
	$scope.showOkMsg = true;
	// Alerta sobre o boleto
	alert("Sua transação será confirmada após o pagamento do boleto.");
    };

    // Captura os cartões que foram aprovados
    $scope.captureCards = function(tids) {
	var transaction_json = {
	    "api_key": apiKeyService.apiKey
	};	    
	console.log(tids);
	$http.post('https://api.pagar.me/1/transactions/' + tids.pop() + '/capture', transaction_json)
	    .then(function successCallback (response) {
		console.log(response.data);
		console.log(tids.length);
		if(tids.length > 0) $scope.captureCards(tids);
	    }, function errorCallback (failure) {
		console.log("failed : ", failure);
	    });

	// Vai pra página de confirmação
	$scope.showOkMsg = true;
    };
}]);
