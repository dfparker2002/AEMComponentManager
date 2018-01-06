function AEMComponent() {

  var functionProps, $component, defaultProps = {
    functionName: "AEMComponent"
  };

  var aemcomponent = function() {
    // Add functionality here
    console.log($component);
  };

  var init = function(properties) {
    functionProps = Object.assign(defaultProps, properties);
    $component = $(document.getElementById(functionProps.componentId));
    aemcomponent();
  };

  return {
    init: init
  };
}
