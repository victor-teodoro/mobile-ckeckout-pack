app.service('styleService', function() {
    this.backgroundColor = {
	"background-color": "#FFFFFF",
	/*"width": "100%"*/
    };
    this.headerColor = {"background-color": "#EE0000"};

    this.setBackgroundColor = function(backgroundColor) {
	this.backgroundColor = {"background-color": backgroundColor};
    };
    this.getBackgroundColor = function(){
	return this.backgroundColor;
    };

    this.setHeaderColor = function(headerColor) {
	this.headerColor= {"background-color": headerColor};
    };
    this.getHeaderColor = function(){
	return this.headerColor;
    };
});
