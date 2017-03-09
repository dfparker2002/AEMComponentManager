# How to use AEM Component Manager
![AEM](http://i.imgur.com/rge5hQf.png)

*When creating an AEM Component, one may need to use JavaScript to perform DOM manipulations / Other Tasks on the component. The right way to add a JavaScript to go hand in hand with the component created is to use a Component Manager and to load JavaScript through the manager.*

>**NOTE:** 

> Usually a Component Manager invokes a jQuery plugin/module via its name on the component's element/root DOM node, But this Component Manager uses native JavaScript to achieve the same functionality as we're unsure about the availability of jQuery at load time.


#Why use a Component Manager

**Technical Answer**: 
As AEM supports having multiple components on a single page, it would be a mess to manage all the components on the page via JavaScript. Theoretically, a non-AEM front end developer would write code for component in such a way that the code would be executed irrespective of the fact that the component is either present in the DOM or not. 

This would cause the code written to fire on every page and probably causing blocks and errors in script execution. One way to avoid this is to use a simple checks to see if the element exists in order to curb this execution on all pages, but, if you have multiple functions targeting single component, it would be hard to keep track of unless proper documentation exists.

On the other hand, a Component Manager is used to load up such functions into a queue and then to queue up all functions of all components on the page and execute the functions one by one once page content is loaded.

**Non Technical Answer**: 

Standard JavaScript functions which are written (poorly) for components runs on every page and throws errors if component is absent and possibly breaks page. 

A component manager is used to load all the said functions for components available on the page in a queue and executes them one by one only when the component is present.

#How does Component Manager Work?

Component Manager provides a function to load up a component into execution queue and stack all components into the queue until the execute queue is called.
When the page finishes loading and all associated content for components have finished rendering, the Component Queue Execution funtctjon is called snd tall the tasks are executed sequentially.

#Where is Component Manager Located?

Component Manager code is located in `/etc/designs/aemcm/clientlib-componentmanager/js/componentmanager.js`

The client lib is categorized as `aemcm.componentmanager` and is not embedded anywhere.

#How does Component Manager run then?

Component Manager in referenced in `/apps/aemcm/components/structure/page/header-libs.jsp`using the clientlib category `<cq:includeClientLib js="aemcm.componentmanager" />`tag so the client lib is included and Component Manager gets loaded just before '`</head>`'.

Component Manager's method '`AEMCM.ComponentManager.runComponents()`' is invoked in `/apps/aemcm/components/structure/page/footer-libs.jsp` Just before '`</body>`'

#How do I Use Component Manager then?

Just include the following code in your component's JSP/HTML file and replace content as necessary:

    <script type="text/javascript>
        AEMCM.ComponentManager.addComponent({
            identifier: "ID_OF_COMPONENT",
            method: "METHOD_NAME",
            properties: []
        });
    </script>
    
replace "**ID_OF_COMPONENT**" with your component's root node ID and "**METHOD_NAME**" with the name of the function you want the component to execute
If you wish to pass parameters to the function say ID or class names of element or any other data, you could pass it in properties parameter as JSON.

> **REMEMBER**
> If you wish to send content from CQ Dialog or Server Generated content to your function you should send it the following way
> 
>
>`...
>
>properties: [{
>
>    elementHeight: '${properties.elementHeight @ context="scriptString"}',
>
>    elementWidth: '${properties.elementWidth @ context="scriptString"}'
>
>}]
>
>...`
>
>Make sure to add `@ context="scriptString"` to your variable so that the content from HTL variable can be sent to the JavaScript function.


Use this boilerplate code in your JS and add your functions inside it.

    "use strict";
    /**
	 * @function METHOD_NAME
	 * @description alerts a name passed to it
	 * 
	 * @author AUTHOR_NAME
	 * @version 1.0
	 * @returns {object} - contains a method to initiate the function
	 */
	 
	 function METHOD_NAME(){
	 
		 /* global properties */
		 var functionProps;
		 
		 // default properties
		 var defaultProps = {
			 functionName: "METHOD_NAME"
		 };
		 
		 /**
		  * @function alertmyname
		  * @description alerts a string from a property
		  */
		  
		  var FUNCTION NAME = function(){
		  
			/*
				  WRITE YOUR CODE HERE
			*/
		  
		  };
		  
		  /**
		   * @function init
		   * @description kickstarts the code
		   * 
		   * @param {object} properties - JSON object containing id, method and parameters
		   */
		   
		   var init = function(properties) {
		   
			   // extend global properties with default properties
			   functionProps = Object.assign(defaultProps, properties);
			   
			   // calling private function
			   FUNCTION_NAME();
		   };
	   return {
		   init: init
	   };
	  }

> **REMEMBER**: replace **FUNCTION_NAME** and **METHOD_NAME** from the code above, and start writing your logic in **FUNCTION_NAME** function

#HELP! I CANT SEE COMPONENT MANAGER IN MY CLIENTLIBS FOLDER!

Make sure that you have merged the Component Manager code in your code. If you haven't merged your code then you won't be able to use Component Manager.

In order to include Component Manager in your code, you need to merge this branch in to yours and build the project first. Here's what you need to do:

#Step-by-step guide

 1. Open your terminal and navigate to the folder where you want the
    project to be created. Usually it would be the repository
    location (i.e., my-aem-project) Make sure your repository is clean
    (this step can be skipped; but is recommended).
    
 2. Run the command "`git merge AEMComponentManager`" to merge the Component Manager in to your code.
 3. If you use Adobe AEM Maven Archtype, then edit your `filter.xml` to include the files and then run the command "`mvn clean install -PautoInstallPackage`" to build and push the changes onto your AEM.

#Still need help?

Open a ticket and post your problem, or contact me [@trancelated](https://twitter.com/trancelated)
