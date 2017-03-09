	function AEMComponent() {

		  var functionProps, $component, defaultProps = {
				  functionName: "AEMComponent"
		  };

			var aemcomponent = function(){

				// Add functionality here
				console.log(functionProps.propertyName);

			};

		  var init = function(properties) {

			  functionProps = Object.assign(defaultProps, properties);

				aemcomponent();

		  };

		  return {
		    init: init
		  };
	}
