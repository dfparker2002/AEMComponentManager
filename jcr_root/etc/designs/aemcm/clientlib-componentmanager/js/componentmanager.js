/**
* @function AEMCM.ComponentManager
* @description avails the functionality to load various components
* into a stack and execute them all at once.
* @author Prasanna Yalala <github.com/ypk>
* @version 1.5
* @returns {object} - collection of functions to use AEM components
*/
;
window.AEMCM = window.AEMCM || {};

(function(AEMCM) {
  "use strict";
  /**
   * @function ComponentManager
   * Contains functions to load and execute components
   * @return {object} - ComponentManager functions
   */
  var ComponentManager = function() {
    /* global component queue */
    var queue = [];
    /**
     * @function addComponent
     * loads component in to queue
     * @param {object} component JSON object containing id, method and parameters
     */
    var addComponent = function(component) {
      try {
        // check for property 'method'
        if (typeof component.method === "undefined") {
          throw "Component Loader: The property 'method' is missing. Make sure you have included a method within the loader";
        }
        // check for property 'identifier'
        if (typeof component.identifier === "undefined") {
          throw "Component Loader: The property 'identifier' is missing. Make sure you have included an identifier within the loader";
        }
        // save component
        queue.push(component);
      } catch (e) {
        console.error(e);
      }
    };
    /**
     * @function runComponents
     * executes the components present in the queue
     */
    var runComponents = function() {
      // check if queue is empty
      if (queue.length === 0) {
        return;
      }
      // loop through queue items and run function appropriately
      queue.map(function iterateQueue(c) {
        var identifier = c.identifier;
        var method = c.method;
        var props = Object.assign(c.properties[0], {
          componentId: identifier
        });
        window[c.method]().init(props);
      });
      // empty the queue
      queue = [];
    };
    return {
      addComponent: addComponent,
      runComponents: runComponents
    };
  };
  AEMCM.ComponentManager = AEMCM.ComponentManager || ComponentManager();
})(window.AEMCM, undefined);
