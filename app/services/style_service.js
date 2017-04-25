app.service('styleService', ['$cookies', function($cookies) {
    this.backgroundColor = {
	"background-color": "#FFFFFF",
	/*"width": "100%"*/
    };
    var headerColorCookie = $cookies.get('headerColor');
    this.headerColor = {"background-color": headerColorCookie || "#EE0000"};

    this.setBackgroundColor = function(backgroundColor) {
	this.backgroundColor = {"background-color": backgroundColor};
    };
    this.getBackgroundColor = function(){
	return this.backgroundColor;
    };

    this.setHeaderColor = function(headerColor) {
	this.headerColor= {"background-color": headerColor};
	$cookies.put('headerColor', headerColor);
    };
    this.getHeaderColor = function(){
	return this.headerColor;
    };
}]);
