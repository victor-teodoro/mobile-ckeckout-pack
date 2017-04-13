app.controller('productCtrl', ['$scope', '$cookies', 'styleService', function($scope, $cookies, styleService) {
    // Getters e setters das cores
    $scope.getBackgroundColor = function () {
	return styleService.getBackgroundColor();
    };
    $scope.getHeaderColor = function () {
	return styleService.getHeaderColor();
    };
    
    // Infos do produto
    $scope.productId = 2345;
    $scope.productName = $cookies.get('productName') || "Tênis Bela Veludo"
    $scope.price = $cookies.get('price') || 239.90;
    $scope.imgURL = $cookies.get('imgURL') || 'https://secure-static.arezzo.com.br/medias/sys_master/arezzo/arezzo/h31/hd0/h00/h00/8917607710750.jpg';
    $scope.priceTemp = $cookies.get('priceTemp');
    $scope.imgURLTemp = $cookies.get('imgURLTemp');
    $scope.productNameTemp = $cookies.get('productNameTemp');

    // Salva as infos do produto
    $scope.saveProductInfo = function() {
	// Preço
	$scope.price = Number($scope.priceTemp.replace(',', '.'));
	$cookies.put('price', $scope.price);
	$cookies.put('priceTemp', $scope.priceTemp);

	// URL da imagem do produto
	$scope.imgURL = $scope.imgURLTemp;
	$cookies.put('imgURL', $scope.imgURL);
	$cookies.put('imgURLTemp', $scope.imgURLTemp);

	// O nome do produto a ser exibido
	$scope.productName = $scope.productNameTemp;
	$cookies.put('productName', $scope.productName);
	$cookies.put('productNameTemp', $scope.productNameTemp);
    };
}]);
