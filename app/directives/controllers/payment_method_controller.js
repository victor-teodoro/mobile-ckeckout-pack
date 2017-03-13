app.controller('paymentMethodCtrl', ['$scope', function($scope) {
    $scope.isCheckout;
    
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

    // Define o método de pagamento
    $scope.creditCard = function() {
	var paymentMethod = $scope.paymentMethods.credit_card;
	$scope.pay(paymentMethod);
    };
    $scope.creditCardAndBoleto = function() {
	var paymentMethod = $scope.paymentMethods.credit_card_and_boleto;
	$scope.pay(paymentMethod);
    };
    $scope.boleto = function() {
	var paymentMethod = $scope.paymentMethods.boleto;
	$scope.pay(paymentMethod);
    };
}]);
