jQuery.noConflict();

import * as kintoneJSSDK from '@kintone/kintone-js-sdk'
import Swal from 'sweetalert2'
var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');

// everytime you select a space the option is no longer available for the next row
// group blank space

(function ($, PLUGIN_ID) {
  'use strict';

  var spacersList = (objLayout) => {
    var items = [{
      label: '--------',
      value: '--------',
      isDisabled: true
    }, ]
    const layout = objLayout.layout
    console.log(layout, "👻layout array")

    function rowLayout(row) {
      var fieldsArray = row.fields
      fieldsArray.forEach(field => {
        // var fields = row.fields;
        if (field.type === 'SPACER') {
          console.log(field, "🤯row fields")
          var itemObj = {}
          itemObj.label = field.elementId
          itemObj.value = field.elementId
          itemObj.isDisabled = false
          items.push(itemObj)
        }
      })
    }

    layout.forEach(index => {
      if (index.type === "GROUP") {
        index.layout.forEach(row => {
          rowLayout(row)
        })
      } else if (index.type === "ROW") {
        rowLayout(index)
      }
    })
    return items
  } // -> end of spacer list 


  //################
  var customCellTextArea = function () {
    return {
      init: function ({
        rowData,
        updateRowData
      }) {
        var span = document.createElement('span');
        var textAreaField = new kintoneUIComponent.TextArea({
          value: rowData.text.value
        });

        span.appendChild(textAreaField.render());

        textAreaField.on('change', function (newValue) {
          console.log(newValue, "😓new value object")
          updateRowData({
            // items: {
            //   isDisabled: false
            // },
            text: {
              value: newValue
            }
          }, true);
        });
        this.textAreaField = textAreaField;
        return span;
      },

      update: function ({
        rowData
      }) {
        var _self = this;
        console.log('rowData:', rowData)

        rowData.dropDown.items.forEach(row => {
          if (row.value === rowData.dropDown.value) {
            rowData.dropDown.items.isDisabled = true
          }
        })

        var textAreaVal = rowData.text; // or ({value: rowData.textarea.value}) ??
        console.log('📸textAreaVal', textAreaVal)
        // console.log("react obj:", _self.textAreaField._reactObject)
        if (textAreaVal && this.textAreaField._reactObject) {
          _self.textAreaField.setValue(textAreaVal.value);
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
        value: 'Input text to be displayed in modal here'
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
    console.log(defaultRowData, "💜")
    console.log(overriddenRowData, "💜💜💜")

    var table = new kintoneUIComponent.Table({
      data: initialData,
      // default row data on row add
      defaultRowData: defaultRowData,
      onCellChange: function (event) {
        // event.data.forEach(row => {
        //   if ( row.dropDown.value === "--------"||row.items.isDisabled === true){
        //     return row.items.isDisabled === false
        //   }
        return JSON.parse(JSON.stringify(overriddenRowData));
      },
      onRowAdd: function (event) {
        console.log('table.onAdd🥎', event.data);
        // if onRowAdd does not return anything, defaultRowData will be used to create new table row
        // event.data.forEach(row => {
        //   if ( row.dropDown.value === "--------"||row.items.isDisabled === true){
        //     return row.items.isDisabled === false
        //   }
        // })
        return JSON.parse(JSON.stringify(overriddenRowData));
      },
      columns: [{
          header: 'Blank Space Element ID',
          cell: function () {
            return kintoneUIComponent.createTableCell('dropdown', 'dropDown')
          }
        },
        {
          header: 'Text to appear in Modal',
          cell: function () {
            return customCellTextArea()
          }
        }
      ]
    });
    return table
  }


  let checkMissingVal = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].dropDown.value === '--------' || data[i].text.value === '') {
        return true
      }
    }
    return false
  }

  let duplicateVal = (data) => {
    //   //if the dropdown item has been chosen
    //   //disable the same val from dropdown

    //   if (data.includes())


    // data.filter((val, index, arr) => arr.indexOf(val) === index)
    for (let i = 0; i < data.length - 1; i++) {
      console.log(data[i].dropDown.value, "🅰️", data[i + 1].dropDown.value, "🅱️")
      if (data[i].dropDown.value === data[i + 1].dropDown.value) {
        data[i + 1].items.isDisabled === true
      }
    }
    // if (duplicateVal(data) === true){

    // }
  }



  var handleSaveClick = (table) => {
    console.log(table, "HELLO");
    var data = table.getValue();
    console.log('🍯data:', data)

    var dataJSON = JSON.stringify(data)
    var config = {
      table: dataJSON
    }

    // if ()

    // console.log(duplicateVal(data), "keeeeeelly👨‍👨‍👦‍👦")
    // if (duplicateVal(data) === true) {
    //   Swal.fire({
    //     title: '<strong>Duplicate Value</strong>',
    //     html: 'You can only have one modal per blank space field. Please delete field',
    //     type: 'error',
    //     confirmButtonText: 'Ok'
    //   })

    // } else 
    if (checkMissingVal(data)) {
      Swal.fire({
        title: '<strong>Invalid Input</strong>',
        html: 'You must choose a spacer field from the dropdown <b>and</b> enter text into the text area',
        type: 'error',
        confirmButtonText: 'Cool'
      })
    } else {
      kintone.plugin.app.setConfig(config, function () {
        Swal.fire({
          timer: 5000,
          title: 'Saved',
          html: 'Don\'t forget to <b>Update App</b> in your app settings. <br> We\'ll take you there now',
          type: 'success',
          showConfirmButton: false
          //   onClose: () => {
          //     clearInterval(timerInterval)
          //   }).then(function(){
          //     window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId() + '#section=settings';
          // })
        });
      })
    }
  }

  var handleCancelButton = () => {
    console.log("GOODBYE")
    Swal.fire({
      title: '<strong>Cancel</strong>',
      html: 'Your changes were not saved',
      type: 'warning',
      confirmButtonText: 'Back to App Settings'
    }).then(function () {
      window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId() + '#section=settings';
    })
  }


  function getSpacer() {
    var connection = new kintoneJSSDK.Connection()
    var kintoneApp = new kintoneJSSDK.App(connection)


    //does config exist
    kintoneApp.getFormLayout(kintone.app.getId(), true).then((rsp) => {
      var config = kintone.plugin.app.getConfig(PLUGIN_ID)
      var spacers = spacersList(rsp)
      var table = setTable(spacers)
      console.log("table issss", table)
      event.data.forEach()
      table.on('cellChange', function (event) {
        console.log(event, "🐒")
        // event.data.forEach()

        // }
      })
      $('.kintone-si-conditions').append(table.render());
      if (config && config.table) {
        var parsedConfig = JSON.parse(config.table);
        console.log(parsedConfig)
        table.setValue(parsedConfig);
      }

      var savebutton = new kintoneUIComponent.Button({
        text: 'Save',
        type: 'submit'
      });
      savebutton.on('click', function () {
        handleSaveClick(table)
      });
      $(".SaveButton").append(savebutton.render())

      var cancelbutton = new kintoneUIComponent.Button({
        text: 'Cancel'
      });
      cancelbutton.on('click', function (event) {
        console.log('on cancel click');
        handleCancelButton(table)
      });
      $(".CancelButton").append(cancelbutton.render())

    }).catch((err) => {
      // This SDK return err with KintoneAPIExeption
      console.log(err);
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