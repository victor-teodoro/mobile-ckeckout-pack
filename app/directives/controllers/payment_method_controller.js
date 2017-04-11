app.controller('paymentMethodCtrl', ['$scope', 'styleService', function($scope, styleService) {
    // Getters e setters das cores
    $scope.getBackgroundColor = function () {
	return styleService.getBackgroundColor();
    };
    $scope.getHeaderColor = function () {
	return styleService.getHeaderColor();
    };
    
    // Diz se é Checkout ou Mktplace
    $scope.isCheckout;
    $scope.numOfBoletos = 0;

    // Valores pagos por cartão ou  boleto
    $scope.amountPerMethod = [];
    
    $scope.aggregateAmount = function() {
	var aggregateAmount = 0;
	for(var i = 0; i < $scope.amountPerMethod.length; ++i) {
	    aggregateAmount += Number($scope.amountPerMethod[i].replace(",", "."));
	}
	return aggregateAmount.toFixed(2).toString().replace(".", ",");
    }

    $scope.amountDiff = function() {
	var restValue = (($scope.price - Number($scope.aggregateAmount().replace(",", "."))).toFixed(2)).toString().replace(".", ",");
	return restValue;
    }
    
    // Cuida do método de pagamento usado
    $scope.payMethod = "";
    $scope.paymentMethods = {
	credit_card: "credit_card",
	credit_card_and_boleto: "credit_card_and_boleto",
	boleto: "boleto"
    };

    // Número de cartões e Inc e Dec
    $scope.numOfCards = 1;
    $scope.addCreditCard = function() {
	$scope.numOfCards += 1;
    };
    $scope.removeCreditCard = function() {
	if($scope.numOfCards <= 1){
	    $scope.numOfCards = 1;
	}
	else $scope.numOfCards -= 1;
    };

    // Normaliza o vetor de valores de pagamento
    $scope.normalizeValuePerMethod = function() {
	$scope.amountPerMethod.push($scope.amountDiff());
	
	for(var i = 0; i < $scope.amountPerMethod.length; ++i) {
	    $scope.amountPerMethod[i] = Number($scope.amountPerMethod[i].replace(",", "."));
	}
    };
    
    // Define o método de pagamento
    $scope.creditCard = function() {
	var paymentMethod = $scope.paymentMethods.credit_card;
	$scope.normalizeValuePerMethod();
	console.log($scope.amountPerMethod);
	$scope.pay(paymentMethod);
    };
    $scope.creditCardAndBoleto = function() {
	var paymentMethod = $scope.paymentMethods.credit_card_and_boleto;
	$scope.normalizeValuePerMethod();
	$scope.pay(paymentMethod);
    };
    $scope.boleto = function() {
	var paymentMethod = $scope.paymentMethods.boleto;
	$scope.pay(paymentMethod);
    };

    // Transforma a soma numa função pra usar em reduce, map, etc.
    $scope.add = function(a, b) {
	return a + b;
    }
    
    // Emula o funciomento de range em Python
    $scope.range = function(min, max, step) {
	step = step || 1;
	var input = [];
	for (var i = min; i <= max; i += step) {
            input.push(i);
	}
	return input;
    };
}]);
