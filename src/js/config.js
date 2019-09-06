import $ from 'jquery';
import * as kintoneJSSDK from '@kintone/kintone-js-sdk'
import Swal from 'sweetalert2'
var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');

// everytime you select a spacer the option is no longer available for the next row
// getspace element api call send alert if the values don't exist one for detail page and the other is for the list page
(function (PLUGIN_ID) {
    'use strict';

    var spacersList = (objLayout) => {
      var items = [{
        label: '--------',
        value: '--------',
        isDisabled: true
      }]
      const layout = objLayout.layout
      // console.log(layout, "👻layout array")
      function rowLayout(row) {
        var fieldsArray = row.fields
        fieldsArray.forEach(field => {
          // var fields = row.fields;
          if (field.type === 'SPACER') {
            // console.log(field, "🤯row fields")
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



    var customCellTextArea = function () {
      return {
        init: function ({
          rowData,
          updateRowData
        }) {
          console.log("row Dataaa", rowData)
          var span = document.createElement('span');
          var textAreaField = new kintoneUIComponent.TextArea({
            value: rowData.text.value
          });

          span.appendChild(textAreaField.render());

          textAreaField.on('change', function (newValue) {
            console.log(newValue, "😓new value object")
            updateRowData({
              items: {
                isDisabled: false
              },
              text: {
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
          // var _self = this;
          console.log('rowData:', rowData)
          var textAreaVal = rowData.text; // or ({value: rowData.textarea.value}) ??
          // console.log('📸textAreaVal', textAreaVal)
          // console.log("react obj:", _self.textAreaField._reactObject)
          if (textAreaVal && this.textAreaField._reactObject) {
            textAreaField.setValue(this.textAreaVal.value);
          }
        }
      }
    }; // ------>end of customCellTextArea



    var setTable = (initialData) => {
      // initial data of a table

      var defaultRowData = JSON.parse(JSON.stringify(initialData[0]))
      // return this data to override default row data onRowAdd
      var overriddenRowData = JSON.parse(JSON.stringify(initialData[0]))

      var table = new kintoneUIComponent.Table({
        data: initialData,
        // default row data on row add
        defaultRowData: defaultRowData,
        onRowAdd: function (e) {
          // if onRowAdd does not return anything, defaultRowData will be used to create new table row
          // if below row data is returned, it will override defaultRowData to be used to create new table row
          return JSON.parse(JSON.stringify(overriddenRowData));
        },
        columns: [{
            header: 'Blank Space ID',
            cell: function () {
              return kintoneUIComponent.createTableCell('dropdown', 'dropDown')
            }
          },
          {
            header: 'Tooltip Text',
            cell: function () {
              return customCellTextArea()
            }
          }
        ]
      });
      return table
    } // -------> end of setTable


    let checkMissingVal = (data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].dropDown.value === '--------' || data[i].text.value === '') {
          return true
        }
      }
      return false
    }

    let duplicateVal = (config) => {
      for (let i = 0; i < data.length - 1; i++) {
        console.log(data[i].dropDown.value, "🅰️", data[i + 1].dropDown.value, "🅱️")
        var dataIndexdDval = data[i].dropDown.value
        var dataIndexIteratedDval = data[i + 1].dropDown.value
        if (dataIndexdDval === dataIndexIteratedDval) {
          return true
        }
      }

      var newConfig = JSON.parse(JSON.stringify(config));
      if (dataIndexdDval === dataIndexIteratedDval) {
        return true // Collect a list of all the currently selected dropdown values
      }
    }


var updatedropDownItems = (config, initialData) => {
  // console.log(config, "5️⃣")
  var items = []
  var updatedConfigArr = []
  initialData[0].dropDown.items.forEach(item => {
    items.push(item.value)
  })
  config.forEach(row => {
    var newRow = JSON.parse(JSON.stringify(initialData[0]))
    // console.log(newRow, "🌂")
    var oldSpacerVal = row.dropDown.value
    var oldTextVal = row.text.value
    if (items.includes(oldSpacerVal)) {
      newRow.dropDown.value = oldSpacerVal
      console.log(true)
    }
    newRow.text.value = oldTextVal
    updatedConfigArr.push(newRow)
  })
  return updatedConfigArr
}

var handleSaveClick = (table) => {
  var data = table.getValue();
  console.log('🍯data:', data)

  var dataJSON = JSON.stringify(data)
  var config = {
    table: dataJSON
  }

  if (duplicateVal(data) === true) {
      Swal.fire({
        title: '<strong>Duplicate Value</strong>',
        html: 'You can only have one modal per blank space field. Please delete field',
        type: 'error',
        confirmButtonText: 'Ok'
      })
  } else if (checkMissingVal(data)) {
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
        html: 'Don\'t forget to <b>Update App</b> in your app settings. <br> We\'ll take you back there now!',
        type: 'success',
        showConfirmButton: false,
        // }).then(function () {
        //   window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId() + '#section=settings';
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
    // }).then(function () {
    //   window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId() + '#section=settings';
  })
}

function getSpacer() {
  var connection = new kintoneJSSDK.Connection()
  var kintoneApp = new kintoneJSSDK.App(connection)

  //does config exist
  kintoneApp.getFormLayout(kintone.app.getId(), true).then((rsp) => {
    var config = kintone.plugin.app.getConfig(PLUGIN_ID)
    var spacers = spacersList(rsp)
    console.log("spacers: ", spacers)
    var initialData = [{
      text: {
        value: ''
      },
      // initial data of dropdown
      dropDown: {
        items: spacers,
        value: '--------'
      }
    }];
    var table = setTable(initialData)
    console.log(initialData, "🦷")


    $('.kintone-si-conditions').append(table.render());


    if (config && config.table) {
      var parsedConfig = JSON.parse(config.table);
      console.log(parsedConfig, "parsed config👀👀👀")
      var newConfig = updatedropDownItems(parsedConfig, initialData)
      table.setValue(newConfig);


      table.on('cellChange', function (event) {
        console.log(event, "EVENT")

        // var eventData = event.data[0].dropDown
        // eventData.items.forEach(item => {
        //   if (eventData.value === item.value) {
        //     for (i = 0; i < item.length; i++) {
        //       item[i].isDisabled = true
        //     }
        //     console.log(event, "👾event👾event👾")
        //   }
        // })
        // table.updateRowData(0, event.data[0])
        var eventDropDownData = event.data[0].dropDown
        console.log(eventDropDownData, "Ⓜ️")

        eventDropDownData.items.forEach(index => {
          // var val = dataRow.dropDown.value
          console.log(index, "😈")
          // for (let i =0; i < event)
          // if (index.value === ) {

          // }


          // var val = dataRow.dropDown.value
          // console.log(val, "👹")
          // console.log(index.value, "🤡")
          // if (index.value === val) {
          //   index.isDisabled = true
          // }
        })

        //call duplicate val functio

        //, {
        // onChange: function ({
        //   data,
        //   rowIndex
        // }) {
        //   table.updateRowData(rowIndex, data[rowIndex])
        // }


        // table.setValue(event.data)
      })
    }

    var savebutton = new kintoneUIComponent.Button({
      text: 'Save',
      type: 'submit'
    });
    savebutton.on('click', function () {
      handleSaveClick(table)
    });

    var cancelbutton = new kintoneUIComponent.Button({
      text: 'Cancel'
    });
    cancelbutton.on('click', function (event) {
      console.log('on cancel click');
      handleCancelButton(table)
    });

    $(".SaveButton").append(savebutton.render())
    $(".CancelButton").append(cancelbutton.render())


  }).catch((err) => {
    console.log(err);
  });
}

getSpacer()


})(kintone.$PLUGIN_ID);


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

//BUGS
// - onRowAdd, textarea val is staying the same but the dropdown is changing indexes
// onrowadd on rowremove  UI-COMPNOENETS
// - duplicate value is only checking th enext index and not the whole array
// - tippy image is broken (svg)