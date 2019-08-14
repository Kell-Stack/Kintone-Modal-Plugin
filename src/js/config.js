jQuery.noConflict();

import * as kintoneJSSDK from '@kintone/kintone-js-sdk'
var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');

(function ($, PLUGIN_ID) {
  'use strict';

  // ######################################################################################

  // Keep a reference to table so we can read its data on save
  var table = null;

  //kintone.promise here 
  //call .then
  var findSpacers = (objLayout) => {
    var items = [{
      label: '--------',
      value: '',
      isDisabled: false
    }]

    let layout = objLayout.layout
    console.log(layout, "👻rows girl")
    var fieldResults = []

    layout.forEach(row => {
      var fields = row.fields;
      console.log(fields, "🤯fields")
      fields.forEach(field => {
        if (field.type === 'SPACER') {
          fieldResults.push(field);
          console.log(fieldResults, "🤧🤧")
        }
      })
      //[{}]
      // fieldResults.forEach(space => {
      //   var obj = {}
      //   obj.label = space.elementId,
      //   obj.value = space.elementId,
      //   obj.isDisabled = false
      //   items.push(obj)

      // })
      //   console.log(elIdArray, "😡")
      //   // console.log(elIdArray, "😡")
    })

    fieldResults.forEach(space => {
      var obj = {}
      obj.label = space.elementId,
        obj.value = space.elementId,
        obj.isDisabled = false
      items.push(obj)
    })
    console.log(items, "👁👁👁")
    return items
  }

  // ####################################################################################-----> Custom Cell
//message rename
//text area -> set val
// table were custcell is either use initial or con

  var customCellTextArea = function () {
    return {
      init: function ({
        rowData,
        updateRowData
      }) {
        var span = document.createElement('span');
        var textAreaField = new kintoneUIComponent.TextArea({
          value: "Enter Modal Text Here"
        });
        // console.log(textAreaField, "👽text area object")

        span.appendChild(textAreaField.render());

        textAreaField.on('change', function (newValue) {
          console.log(newValue, "😓new value object")
          updateRowData({
            text: {
              value: newValue
            }
          }, false);
        });
        this.textAreaField = textAreaField;
        return span;
      },

      //set config only if it exists write conditional here
      update: function ({
        rowData
      }) {
        var textAreaVal = rowData.textAreaField; // or ({value: rowData.textarea.value}) ??
        if (textAreaVal && this.textAreaField._reactObject) {
          this.textAreaField.getValue(textAreaVal.value);
        }
        console.log(this.textAreaField, "😐😐update text area object😐😐")
      }
    }
  };


  // #####################################################################################------>Data
  var setTable = (spacers) => {
    // initial data of a table
    var initialData = [{
      text: {
        value: ''
      },
      // initial data of dropdown
      dropDown: {
        items: spacers,
        value: ''
      }
    }, ];

    var defaultRowData = JSON.parse(JSON.stringify(initialData[0]))
    // var defaultRowData = initialData[0].dropDown.items[0].label('tEST').value
    // return this data to override default row data onRowAdd
    var overriddenRowData = JSON.parse(JSON.stringify(initialData[0]))

    // #################################################################################----->Table


    var table = new kintoneUIComponent.Table({
      // initial table data
      data: initialData,
      // default row data on row add
      defaultRowData: defaultRowData,
      onRowAdd: function (e) {
        console.log('table.onAdd🥎', e);
        // if onRowAdd does not return anything, defaultRowData will be used to create new table row
        // if below row data is returned, it will override defaultRowData to be used to create new table row
        
        
        
        
        return JSON.parse(JSON.stringify(overriddenRowData));
      },
      columns: [{
          header: 'Blank Space Element ID',
          cell: function () {
            return kintoneUIComponent.createTableCell('dropdown', 'dropDown')
          }
        },
        {
          header: 'Modal Text-Custom',
          cell: function () {
            return customCellTextArea()
          }
        }
      ]
    });
    return table
  }

 
  // ###########################################################################----->Set Value

  // input config is going to be the prev config settings objects and putting that in a save object

  
  //does the config exist?
  //if yes, populate table with the config
  //if no, populate table w form field
  //table.setvalue
  // var config = defaultRowData.dropDown


  //1. save new value object with save button functionality
  //2. if user chooses initial value "------" and adds modal text and saves, alert message will pop up
  //    - can only 


  var handleSaveClick = (event) => {
    console.log(table);
    var data = table.getValue();
    console.log('🍯data:', data)
    var savedRowData = data.map(record => {
      return {
        label: record.dropDown.value,
        value: record.text.value,
        isDisabled: false // TODO: Pull this value from the table
      }
    })
    var dataJSON = JSON.stringify(data)
    var config = {table: dataJSON}
    kintone.plugin.app.setConfig(config, function() {
      window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId() + '#section=settings';
      // Callback - do we do something here?
    });
  }

                                //MAKE THE CALL kintone.plugin.app.getConfig
                                //returns the stringify table obj
                                //grab data
                                //resp.data.parse json
                                //console log the resp to see what it looks like
                                //does config file contains the array of object EACH OBJECT IS A ROW
                                //populate the data in table
                                //table.setValue(data)

  // ###########################################################################----->Buttons

  var savebutton = new kintoneUIComponent.Button({
    text: 'Save'
  });
  var bodySB = document.getElementsByTagName("BODY")[0];
  bodySB.appendChild(savebutton.render());
  savebutton.on('click', handleSaveClick);

  var cancelbutton = new kintoneUIComponent.Button({
    text: 'Cancel'
  });
  var bodyCB = document.getElementsByTagName("BODY")[0];
  bodyCB.appendChild(cancelbutton.render());
  cancelbutton.on('click', function (event) {
    console.log('on cancel click');
  });

  // ######################################################################################-----> Get Blank Space


  function getSpacer() {
    var connection = new kintoneJSSDK.Connection()
    var kintoneApp = new kintoneJSSDK.App(connection)

    kintoneApp.getFormLayout(kintone.app.getId(), true).then((rsp) => {
      var spacers = findSpacers(rsp)
      console.log(spacers)
      table = setTable(spacers)




      $('.kintone-titlee').text('Tooltip Label Plugin')
      $('.kintone-si-conditions').append(table.render());
      //get config before you settable 
      //pass config as second param after spacers
      //if config exiists then setval() (textarea ui comp)
      //if it doesn't exist pass initialData


      
      var config = kintone.plugin.app.getConfig(PLUGIN_ID)
      console.log(JSON.parse(config.table,"💀"))
      if(JSON.parse(config.table)){
        console.log(true) 
        table.setValue(JSON.parse(config.table));  //isn't working
        console.log(table, "table🍽")
       }
    }).catch((err) => {
      // This SDK return err with KintoneAPIExeption
      console.log(err.get());
    });
  }

  getSpacer()
  

})(jQuery, kintone.$PLUGIN_ID);





  //TO DO
  // request data from app => once client adds plugin to their app it should already be fetching data only from the blank fields✅
  // make save and cancel buttons w/o function ✅
  // make api call request to layout api ✅

  //PSEUDO CODE

  // A. App initialization: 
  //  1. Access data from the API ✅

  // B. Saving data:
  //  1. Get data from each column✅
  //     a. Construct result data structure
  //  2. Validate data: 
  //    a. if valid, proceed
  //    b. if invalid, display error message
  //  3. Send data to API
  //    a. Success/error callbacks, 
  //      i. if error display error
  //      ii. if success, navigate to old page (using HTML5 History API=> window.history.back()) -> alert user to update app to see changes 

  //use jssdk get form layout and create a promise ✅
  // create function that will filter through resp obj and return only blank space fields✅
  //once problem is resolved, populate fields that i need SPACER ✅
  // need to figure out field group with a blank space inside ✅