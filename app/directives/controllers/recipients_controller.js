app.controller('recipientsCtrl', ['$scope', '$http', 'apiKeyService', 'styleService', function($scope, $http, apiKeyService, styleService) {
    // Getters e setters das cores
    $scope.getBackgroundColor = function () {
	return styleService.getBackgroundColor();
    };
    $scope.getHeaderColor = function () {
	return styleService.getHeaderColor();
    };
    
    // Infos dos recebedores
    $scope.recipients = [];
    $scope.selectedRecipients = [];

    // Split rules
    $scope.splitRules = [];
    $scope.options = ["Sim", "Não"];
    $scope.isAmount = false;

    // Dados do novo recebedor (o front atualiza automaticamente os valores)
    $scope.recipient_creation = {
	"api_key": apiKeyService.apiKey,
	"transfer_interval": "monthly",
	"transfer_day": "5",
	"transfer_enabled": "true",
	"bank_account": {
	    "object": "bank_account",
	    "bank_code": "237",
	    "agencia": undefined,
	    "agencia_dv": undefined,
	    "conta": undefined,
	    "conta_dv": undefined,
	    "document_type": "cpf",
	    "document_number": undefined,
	    "legal_name": undefined
	}
    };

    // Número de recebedores e Inc e Dec
    $scope.numOfRecipients = 1;
    $scope.addRecipient = function() {
	$scope.numOfRecipients += 1;
    };
    $scope.removeRecipient = function() {
	if($scope.numOfRecipients <= 1){
	    $scope.numOfRecipients = 1;
	}
	else $scope.numOfRecipients -= 1;
    };

    // Emula o funciomento de range em Python
    $scope.range = function(min, max, step) {
	step = step || 1;
	var input = [];
	for (var i = min; i <= max; i += step) {
            input.push(i);
	}
	return input;
    };

    // Atualiza a lista de recebedores
    $scope.updateRecipients = function() {
	$http.get('https://api.pagar.me/1/recipients?api_key=' + apiKeyService.apiKey)
	    .then(function successCallback (response) {
		// Pega os 4 primeiros recebedores apenas
		for(var i = 0; i < 5; ++i) {
		    $scope.recipients[i] = response.data[i];

		    console.log($scope.recipients[i]);
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
		$scope.updateRecipients();
	    }, function errorCallback (failure) {
		console.log("failed : ", failure);
	    });
    };

    // Constroi as split rules
    $scope.buildSplitRules = function() {
	for(selectedRecipient of $scope.selectedRecipients) {
	    //Muda de sim e não para true e false
	    if(selectedRecipient.liable === "Não") selectedRecipient.liable = false;
	    else selectedRecipient.liable = true;

	    if(selectedRecipient.fee === "Não") selectedRecipient.fee = false;
	    else selectedRecipient.fee = true;

	    // Monta a split rule
	    console.log("Usa dinheiro: " + $scope.isAmount);
	    if($scope.isAmount === false) {
		var splitRule = {
		    "recipient_id": selectedRecipient.id,
		    "charge_processing_fee": selectedRecipient.fee,
		    "liable": selectedRecipient.liable,
		    "percentage": selectedRecipient.percentage	
		};
	    } else {
		var splitRule = {
		    "recipient_id": selectedRecipient.id,
		    "charge_processing_fee": selectedRecipient.fee,
		    "liable": selectedRecipient.liable,
		    "amount": (Number(selectedRecipient.amount.replace(",", ".")).toFixed(2))*100
		};
	    }

	    $scope.splitRules.push(splitRule);
	}
    };
}]);
