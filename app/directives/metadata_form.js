app.directive("metadataForm", function() {
    return {
        templateUrl : "directives/views/metadata_form.html",
	controller: 'metadataCtrl',
	scope: {
	    metadata: "=metadata",
	    saveMetadata: "=saveMetadata"
	}
    };
});
