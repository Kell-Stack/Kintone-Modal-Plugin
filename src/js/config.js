jQuery.noConflict();

import * as kintoneJSSDK from '@kintone/kintone-js-sdk'
var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');

(function ($, PLUGIN_ID) {
  'use strict';


  //TO DO
  // request data from app => once client adds plugin to their app it should already be fetching data only from the blank fields✅
  // make save and cancel buttons w/o function ✅
  // make api call request to layout api ✅

  //PSEUDO CODE

  // A. App initialization: 
  //  1. Get data from the API ✅

  // B. Saving data:

  //  1. Attempt to get data from each column
  //     a. Construct result data structure
  //  2. Validate data: 
  //    a. if valid, proceed
  //    b. if invalid, display error message
  //  3. Send data to API
  //    a. Success/error callbacks, 
  //      i. if error display error
  //      ii. if success, navigate to old page (using HTML5 History API=> window.history.back()) -> alert user to update app to see changes 

  //use jssdk get form layout and create a promise 
  //once problem is resolved, populate fields that i need SPACER ✅
  // need to figure out field group with a blank space inside ✅


  // #################################################################

  // var spacers = findSpacers(resp)



  // ######################################################################################-----> Get Blank Space

  // create function that will filter through resp obj and return only blank space fields
  // when refactoring try to use for loop or map as oppsed to nested forEach

  //kintone.promise here 
  //call .then
  var findSpacers = (objLayout) => {
    var items =  [{
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
      //[{}]
      // fieldResults.forEach(space => {
      //   var obj = {}
      //   obj.label = space.elementId,
      //   obj.value = space.elementId,
      //   obj.isDisabled = false
      //   items.push(obj)
        
      })
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

  var customCell = function () {
    return {
      init: function ({
        rowData,
        updateRowData
      }) {
        var span = document.createElement('span');
        var textAreaField = new kintoneUIComponent.TextArea({
          value: "⛩Modal Text⛩"
        });
        // console.log(textAreaField, "👽text area object")

        span.appendChild(textAreaField.render());

        textAreaField.on('change', function (newValue) {
          console.log(newValue, "😓new value object")
          updateRowData({
            textarea: {
              value: newValue
            }
          }, false);
        });
        this.textAreaField = textAreaField;
        return span;
      },
      update: function ({
        rowData
      }) {
        var textAreaVal = rowData.textAreaField; // or ({value: rowData.textarea.value}) ??
        if (textAreaVal && this.textAreaField._reactObject) {
          this.textAreaField.getValue(textAreaVal.value);
        }
        // console.log(this.textAreaField, "😐😐update text area object😐😐")
      }
      //once user saves you will setConfig
    }
  };


  // #####################################################################################------>Data
  var setTable = (spacers) => {
  // initial data of a table
  var initialData = [{
    text: {
      value: 'text field'
    },
    // initial data of dropdown
    dropDown: {
      items: spacers,
      value: ''
    },
    // label: {
    //   text: 'Name',
    //   textColor: '#e74c3c',
    //   backgroundColor: 'yellow',
    //   isRequired: true
    // },
    iconBtn: {
      type: 'insert',
      color: 'blue',
      size: 'small'
    },
    alert: {
      text: 'Network error',
      type: 'error'
    }
  }, ];

  // default row data of a table, this data will be used to create new row
  // var defaultRowData = {
  //   text: {
  //     value: 'text field'
  //   },
  //   // initial data of dropdown
  //   dropDown: {
  //     items: [
  //       {
  //         label: '--------',
  //         value: 'blank',
  //         isDisabled: false
  //       },
  //    ],
  //     value: 'blank'
  //   },
  //   // label: {
  //   //   text: 'Name',
  //   //   textColor: '#e74c3c',
  //   //   backgroundColor: 'yellow',
  //   //   isRequired: true
  //   // },
  //   iconBtn: {
  //     type: 'insert',
  //     color: 'blue',
  //     size: 'small'
  //   },
  //   alert: {
  //     text: 'Network error',
  //     type: 'error'
  //   }
  // }
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
      console.log('table.onAdd', e);
      // if onRowAdd does not return anything, defaultRowData will be used to create new table row
      // if below row data is returned, it will override defaultRowData to be used to create new table row
      return JSON.parse(JSON.stringify(overriddenRowData));
    },
    columns: [{
        header: 'Blank Space Element ID💜',
        cell: function () {
          return kintoneUIComponent.createTableCell('dropdown', 'dropDown')
        }
      },
      {
        header: '💜Modal Text-Custom',
        cell: function () {
          return customCell()
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
  //if no , populate table w form field
  //table.setvalue
  // var config = defaultRowData.dropDown
  // console.log(config, "🐶🐶🐶supposedly config")



  // ###########################################################################----->Buttons


  var savebutton = new kintoneUIComponent.Button({
    text: 'will be a save button✅'
  });
  var bodySB = document.getElementsByTagName("BODY")[0];
  bodySB.appendChild(savebutton.render());
  savebutton.on('click', function (event) {
    console.log('on save click');
  });

  var cancelbutton = new kintoneUIComponent.Button({
    text: 'will be a cancel button❌'
  });
  var bodyCB = document.getElementsByTagName("BODY")[0];
  bodyCB.appendChild(cancelbutton.render());
  cancelbutton.on('click', function (event) {
    console.log('on cancel click');
  });


  // #######################################################################################-----> Render

  // ############################################----->Call Layout API

  function getSpacer() {
    var connection = new kintoneJSSDK.Connection()
    var kintoneApp = new kintoneJSSDK.App(connection)

    kintoneApp.getFormLayout(kintone.app.getId(), true).then((rsp) => {
      var spacers = findSpacers(rsp)
      console.log(spacers)
      var table = setTable(spacers)
      $('.kintone-titlee').text('Tooltip Label Plugin')
      $('.kintone-si-conditions').append(table.render());
    }).catch((err) => {
      // This SDK return err with KintoneAPIExeption
      console.log(err.get());
    });
  }

  getSpacer()


})(jQuery, kintone.$PLUGIN_ID);