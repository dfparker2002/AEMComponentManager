"use strict";
/**
 * @function AEMComponent
 * @description consoles out a name
 * 
 * @author ypk
 * @version 1.1
 * @returns {object} - contains a method to initiate the function
 */

function AEMComponent() {

  /* global properties */
  var functionProps;

  // default properties
  var defaultProps = {
    functionName: "AEMComponent"
  };

  /**
   * @function log
   * @description consoles a string from a property
   */

  var log = function() {

    console.log({
      "Component Name": functionProps.functionName,
      "Property": functionProps.customProperty
    })

  };

  /**
   * @function init
   * @description kickstarts the code
   * 
   * @param {object} properties - JSON object passed in through the config
   */

  var init = function(properties) {

    // extend global properties with default properties
    functionProps = Object.assign(defaultProps, properties);

    // calling private function
    log();
    
  };
  
  return {
    init: init
  };
  
}
