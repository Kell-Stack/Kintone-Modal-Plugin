jQuery.noConflict();

(function($, PLUGIN_ID) {
  'use strict';

  var $form = $('.js-submit-settings');
  var $cancelButton = $('.js-cancel-button');
  var $message = $('.js-text-message');
  var config = kintone.plugin.app.getConfig(PLUGIN_ID);
  console.log(config)
  
//can change buttons using UI component

//1. getConfig
//2. take that informtion and populate tables
//      create a table config plug in settings (think conditional formatting)
//      save the input that the user changes and store into an object
//      then pass that object to 
//      in desktop.js you are going to hide/display/etc in the place of a modal       
//
//

  //CREATE YOUR LAYOUT FOR CONFIG SECTION
  //1. format table
        //look into the example code for table in the UI component
        //https://kintone.github.io/kintone-ui-component/latest/Reference/Table/
        //create at least two columns -> field that you want to add the modal to & the message
        //you will need to call a function so that you can add new rows (new conditions/new message/new modal)
              //  iterate through so the default information thats in the row above will show up again if the user duplicates(built into the lib)
        //getElementById of settings and append the render table to it 
  //2. create save and cancel button
        //use UI component to create save and cancel button
        //use the builtin event listeners from UI compnonent to listen for the click trigger
            //for cancel button: onClick/onChange should return back to the settings page (history.back())
            //for save button: take the object that contains the config settings (information from table) and make an API call to set the config then return to the klist of all plugins page (where conditional formatting and tooltip are)
//KEEP IN MIND
// alert messages on the save button if one column is filled but not the other -> alert for incomplete data

//make an API call to get the form fields, populate and convert into the folowing format:
// items: [
//           {
//               label: 'Orange',
//               value: 'Orange',
//               isDisabled: false
//           },
//           {
//               label: 'Banana',
//               value: 'Appetizer',
//               isDisabled: true
//           },
//           {
//               label: 'Lemon',
//               value: 'Lemon',
//               isDisabled: true
//           },
//         ],
//         value: 'Banana'
//       },


//create var with this format and set it for the "items"
//the value will be the FIELD CODE (will get and error if you put a value that is not an option)

  if (config.message) {
    $message.val(config.message);
  }
  $form.on('submit', function(e) {
    e.preventDefault();
    console.log("😎😎😎",{message: $message.val()})
    kintone.plugin.app.setConfig({message: $message.val()}, function() {
      alert('The plug-in settings have been saved. Please update the app!');
      window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId();
    });
  });
  $cancelButton.on('click', function() {
    window.location.href = '/k/admin/app/' + kintone.app.getId() + '/plugin/';
  });
})(jQuery, kintone.$PLUGIN_ID);
