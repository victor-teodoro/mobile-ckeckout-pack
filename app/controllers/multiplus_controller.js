app.controller('multiplusCtrl', function($scope, $http, $location, $timeout) {
    // Mostra o depois da transação com ng-show
    $scope.success = false;

    /**********************************************
     *  Variáveis que lidam com a transação
     *********************************************/
    let encryptionKey = "ek_test_G84bs5wa355FioxHAC00lGUe1f1p4O";
    let apiKey = "ak_test_jUC8l5YGoIX34M8IMYSmG7Sd8YcUkH";
    let planAmount = 4290;
    let planId = 153461;
    $scope.tids = []; // Guarda os ids das transações para captura
    $scope.cardsProcessed = 0;
    $scope.numOfCards = 1;
    $scope.amountNetshoes = 2220;
    $scope.amountPontofrio = 1350;
    $scope.isResgate = false;


    /********************************************************************************
     * Daqui pra baixo estão as funções que lidam com o processamento dos pagamentos
     * Idealmente estariam num service ou outro controller, se você estiver usando
     * outro framwework que não Angular 
     *******************************************************************************/

    $scope.checkLocation = function() {
	if($location.path() === "/multiplus/troque_pontos") {
	    $scope.isResgate = true;
	    $timeout(function () {
		$scope.checkout();
	    }, 200);
	}
	else if($location.path() === "/multiplus/clube") {
	    $timeout(function () {
		$scope.subscribe();
	    }, 200);
	}
	else {
	    $timeout(function () {
		$scope.checkout();
	    }, 200);
	}
    };
    
    // Pagar só com cartão
    $scope.checkout = function () {
	// Prepara as split rules e metadata dependendo de se vamos usar ou não
	let splitRules;
	let metadata;
	let price;	
	
	if($scope.isResgate === true) {
	    splitRules = [
		{
		    "recipient_id": "re_cj1v8ahld0079sz6eb1e3deiy",
		    "charge_processing_fee": true,
		    "liable": true,
		    "amount": $scope.amountNetshoes
		},
		{
		    "recipient_id": "re_cj1v8bp8u009fvn6d8depdq49",
		    "charge_processing_fee": true,
		    "liable": true,
		    "amount": $scope.amountPontofrio
		}
	    ];

	    metadata = {
		"sellers_involved": [
		    {
			"name": "Netshoes",
			"amount": $scope.amountNetshoes,
			"number_of_points": 910,
			"product_name": "TÊNIS VOLCOM LO FI VLCM",
			"product_id": 14367
		    },
		    {
			"name": "Pontofrio",
			"amount": $scope.amountPontofrio,
			"number_of_points": 550,
			"product_name": "JOGO MAD MAX - PC",
			"product_id": 15623
		    }
		],
		"season": "outono"
	    };

	    price = $scope.amountNetshoes + $scope.amountPontofrio;
	    
	} else {
	    splitRules = null;
	    metadata = {
		"month": "Abril",
		"order_id": 56472,
		"number_of_points": 1000,
		"price": 7000
	    };
	    price = 7000;
	}
	
	// INICIAR A INSTÂNCIA DO CHECKOUT
        var checkout = new PagarMeCheckout.Checkout({"encryption_key": encryptionKey, success: function(data) {
	    console.log(data);    

	    var transaction_json = {
		"api_key": apiKey,
		"amount": price,
		"split_rules": splitRules,
		"metadata": metadata
	    };

	    $http.post('https://api.pagar.me/1/transactions/' + data.token + '/capture', transaction_json)
		 .then(function successCallback (response) {
		     console.log(response.data);
		     $scope.success = true;			
		 }, function errorCallback (failure) {
		     console.log("failed : ", failure);
		 });				
        }});

        // DEFINIR AS OPÇÕES
        // e abrir o modal
        var params = {
	    "customerData": "false",
	    "amount": price,
	    "createToken": "true",
	    "maxInstallments": "12",
	    "paymentMethods": "credit_card, boleto",
	    "interestRate": "0",
	    "uiColor": "#117fca",
	    "headerText": "Multiplus"
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

    // Assina o plano 1000 Pontos
    $scope.subscribe = function() {	
	checkout = new PagarMeCheckout.Checkout({encryption_key: encryptionKey, success: function(data) {
	    console.log(data);

	    if(data.payment_method === "boleto") data.card_hash = null;
	    captureSubscription(data.token, data.payment_method, data.card_hash, planId, planAmount);
        }
	})
	
        var params = {
	    customerData:"false",
	    amount: planAmount,
	    createToken: "false",
	    uiColor: "#117fca",
	    headerText: "Multiplus",
	    paymentMethods: "credit_card, boleto"
        }

        checkout.open(params);  
    };

    let captureSubscription = function(token, paymentMethod, cardHash, id, amount) {
	subscription_json = { 
	    api_key: apiKey,
	    card_hash: cardHash,
	    payment_method: paymentMethod,
	    amount: amount,
	    customer: {
		email: "victor.teodoro@pagar.me"
	    },
	    metadata: {
		plan_id: id,
		plan_amount: amount,
		number_of_points: 1000
	    }
        };
	
	$http.post('https://api.pagar.me/1/subscriptions', subscription_json)
	     .then(function successCallback (response) {
		 console.log(response.data);
		 $scope.success = true;
	     }, function errorCallback (failure) {
		 console.log("failed : ", failure);
	     });
    };
});

