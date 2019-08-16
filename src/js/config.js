jQuery.noConflict();

import * as kintoneJSSDK from '@kintone/kintone-js-sdk'
import Swal from 'sweetalert2'
var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');

// everytime you select a space the option is no longer available for the next row
//

(function ($, PLUGIN_ID) {
  'use strict';

  // ######################################################################################

  // Keep a reference to table so we can read its data on save
  var table = null;


  var findSpacers = (objLayout) => {
    var items = [{
      label: '--------',
      value: '--------',
      isDisabled: true
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
  //text area -> set val
  // table where custcell is either use initial or config

  var customCellTextArea = function () {
    return {
      init: function ({
        rowData,
        updateRowData
      }) {
        var span = document.createElement('span');
        var textAreaField = new kintoneUIComponent.TextArea({
          value: ''
        });

        //  Var body = document.getElementsByTagName("BODY")[0];
        // body.appendChild(textAreaField.render());

        // textAreaField.setValue();
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
      //trying to setVal for cust cell here


      update: function ({
        rowData
      }) {
        var _self = this;
        console.log('rowData:', rowData)
        var textAreaVal = rowData.text; // or ({value: rowData.textarea.value}) ??
        console.log('📸textAreaVal', textAreaVal)
        console.log("react obj", _self.textAreaField._reactObject)
        if (textAreaVal) {
          _self.textAreaField.setValue(textAreaVal.value);
        }
        console.log(this.textAreaField, "😐😐update text area object😐😐")
      }
    }
  };


  // #####################################################################################------>Data
  //pass config as second param after spacers ✅
  var setTable = (spacers, config) => {
    // initial data of a table
    var initialData = [{
      text: {
        value: ''
      },
      // initial data of dropdown
      dropDown: {
        items: spacers,
        value: '--------'
      }
    }, ];
    //redefine dRD and oRD point/refernce
    var defaultRowData = JSON.parse(JSON.stringify(initialData[0]))
    // return this data to override default row data onRowAdd
    var overriddenRowData = JSON.parse(JSON.stringify(initialData[0]))

    var table = new kintoneUIComponent.Table({
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


  //1. save new value object with save button functionality ✅
  //2. if user chooses initial value "------" and adds modal text and saves, alert message will pop up
  //3. if user chooses a modal that already has a text area val, alert message will pop up


  function checkMissingVal(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].dropDown.value === '--------' || data[i].text.value === '') {
        return true
      }
    }
    return false
  }

  var handleSaveClick = (event) => {
    console.log(table);
    var data = table.getValue();
    console.log('🍯data:', data)
    var dataJSON = JSON.stringify(data)
    var config = {
      table: dataJSON
    }
    // initial data is disabled but you can still type in the box and save it with ----, error message
    if (checkMissingVal(data)) {
      Swal.fire({
        title: 'Error!',
        text: 'Incomplete values. You must choose a spacer field from the dropdown and enter text into the text area',
        type: 'error',
        confirmButtonText: 'Cool'
      })
    } else {
      kintone.plugin.app.setConfig(config, function () {
        //this takes yu back to settings once you hit the save button
        // disabled while working
        window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId() + '#section=settings';

      });
    }
  }


  //MAKE THE CALL kintone.plugin.app.getConfig
  //returns the stringify table obj
  //grab data
  //resp.data.parse json
  //console log the resp to see what it looks like
  //does config file contains the array of object EACH OBJECT IS A ROW
  //populate the data in table
  //table.setValue(data)

  var table = new kintoneUIComponent.Table({
    // inital table data
    data: [{
      text: {
        value: 'this is a text field'
      }
    }],
    // default row data on row add
    defaultRowData: {
      text: {
        value: 'default text field value'
      }
    },
    columns: [{
      header: 'Text',
      cell: function () {
        return kintoneUIComponent.createTableCell('text', 'text')
      }
    }, ]
  });
  var body = document.getElementsByTagName("BODY")[0];
  body.appendChild(table.render());

  table.on('rowAdd', function (event) {
    console.log(event);
  });
  table.on('rowRemove', function (event) {
    console.log(event);
  });
  table.on('cellChange', function (event) {
    console.log(event);
  });


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
      table = setTable(spacers)
      table.on('cellChange', function (event) {
        console.log(event, "🐒")
      })

      $('.kintone-titlee').text('Tooltip Label Plugin')
      $('.kintone-si-conditions').append(table.render());
      //add event listener table.rowAdd rowRemove cellchange
      // see if its making any updates to the table



      //if it doesn't exist pass initialData


      //get config before you setTable ✅
      var config = kintone.plugin.app.getConfig(PLUGIN_ID)
      console.log(JSON.parse(config.table), "💀saved row value")

      //if config exiists then setval() (textarea ui comp)
      if (JSON.parse(config.table)) {
        console.log(true, "🦑")
        table.setValue(JSON.parse(config.table)); //isn't working
        console.log(table, "table🍽")
      }
      console.log(config.customCellTextArea, "🐙")

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
//    a. if valid, proceed✅
//    b. if invalid, display error message
//  3. Send data to API
//    a. Success/error callbacks, 
//      i. if error display error
//      ii. if success, navigate to old page (using HTML5 History API=> window.history.back()) -> alert user to update app to see changes ✅

//use jssdk get form layout and create a promise ✅
// create function that will filter through resp obj and return only blank space fields✅
//once problem is resolved, populate fields that i need SPACER ✅
// need to figure out field group with a blank space inside ✅