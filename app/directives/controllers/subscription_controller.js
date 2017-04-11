app.controller('subscriptionCtrl', ['$scope', '$http', 'apiKeyService', 'styleService', function($scope, $http, apiKeyService, styleService) {
    // Getters e setters das cores
    $scope.getBackgroundColor = function () {
	return styleService.getBackgroundColor();
    };
    $scope.getHeaderColor = function () {
	return styleService.getHeaderColor();
    };
    
    // Infos dos planos
    $scope.plans = [];
    $scope.selectedPlan = {};
    $scope.showOkMsg = false;

    // Dados do novo plano (o front atualiza automaticamente os valores)
    $scope.plan_json = {
	"api_key": apiKeyService.apiKey, 
	"amount": undefined,
	"days": undefined,
	"name": undefined,
	"trial_days": undefined,
	"payment_methods": ["credit_card", "boleto"],
	"charges": null,
	"installments": 1
    };

    // Atualiza a lista de recebedores
    $scope.updatePlans = function() {
	$http.get('https://api.pagar.me/1/plans?api_key=' + apiKeyService.apiKey)
	    .then(function successCallback (response) {
		// Pega os 4 primeiros recebedores apenas
		for(var i = 0; i < 4; ++i) {
		    $scope.plans[i] = response.data[i];
		    // Formata o valor para exibição
		    $scope.plans[i].amountFormatted = ($scope.plans[i].amount/100).toFixed(2).toString().replace(".", ",");
		    console.log($scope.plans[i]);
		}
		
	    }, function errorCallback (failure) {
		console.log("failed : ", failure);
	    });
    };
    
    // Cadastra um novo recebedor
    $scope.registerRecipient = function() {
	$http.post('https://api.pagar.me/1/recipients', $scope.recipient_creation)
	    .then(function successCallback (response) {
		console.log(response.data);
	    }, function errorCallback (failure) {
		console.log("failed : ", failure);
	    });
    };

    // Constroi as split rules
    $scope.subscribe = function() {
	// Salva os metadatas
	$scope.saveMetadata();
	
	checkout = new PagarMeCheckout.Checkout({encryption_key: apiKeyService.encryptionKey, success: function(data) {
            console.log(data);

	    if(data.payment_method === "boleto") data.card_hash = null;
	    captureSubscription(data.token, data.payment_method, data.card_hash, $scope.selectedPlan.id, $scope.selectedPlan.amount, $scope.metadata);
        }
						})
	
        var params = {
            customerData:"false",
            amount: $scope.selectedPlan.amount,
            createToken: "false",
            uiColor: "#000000",
            paymentMethods: "credit_card, boleto"
        }

        checkout.open(params);  
    };

    $scope.createPlan = function() {
	// Corrige o formato do valor (de uma string para um # em centavos)
	$scope.plan_json.amount = (Number($scope.plan_json.amount.replace(",", ".")).toFixed(2))*100;
	
	$http.post('https://api.pagar.me/1/plans', $scope.plan_json)
	    .then(function successCallback (response) {
		console.log(response.data);
		$scope.updatePlans();
	    }, function errorCallback (failure) {
		console.log("failed : ", failure);
	    });
    }

    var captureSubscription = function(token, paymentMethod, cardHash, amount, id, metadata) {
	subscription_json = { 
	    api_key: apiKeyService.apiKey,
	    card_hash: cardHash,
	    payment_method: paymentMethod,
            amount: amount,
	    customer: {
		email: "lembrancasnefianas02@gmail.com"
	    },
            metadata: metadata,
        };
	
	$http.post('https://api.pagar.me/1/subscriptions', subscription_json)
	    .then(function successCallback (response) {
		console.log(response.data);
		$scope.showOkMsg = true;
	    }, function errorCallback (failure) {
		console.log("failed : ", failure);
	    });
    };
}]);
