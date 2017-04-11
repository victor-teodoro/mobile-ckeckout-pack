app.controller('telesalesCtrl', ['$scope', '$http', 'apiKeyService', 'styleService', function($scope, $http, apiKeyService, styleService) {
    // Getters e setters das cores
    $scope.getBackgroundColor = function () {
	return styleService.getBackgroundColor();
    };
    $scope.getHeaderColor = function () {
	return styleService.getHeaderColor();
    };

    // Controla o que é mostrado
    $scope.chktSuccess = false;
    $scope.linkSuccess = false;

    // Email do cliente
    $scope.costumerEmail = "";
    $scope.costumerName = "";

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
	    "uiColor": $scope.getHeaderColor()["background-color"]
	};
	
        checkout.open(params);	    
    };

    $scope.sendEmail = function() {
	// Parâmetros do POST
	var emailAPIEndpoint = 'https://pagarme-email-api.herokuapp.com/';
	var emailPost = {
	    name:  $scope.costumerName,
	    email: $scope.costumerEmail
	};

	// POST das infos do cliente
	$http.post(emailAPIEndpoint, emailPost)
	    .then(function successCallback (response) {
		console.log(response.data);

		$scope.linkSuccess = true;		
	    }, function errorCallback (failure) {
		console.log("failed : ", failure);
	    });	
    }
}]);

