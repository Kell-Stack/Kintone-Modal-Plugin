import $ from 'jquery';
import * as kintoneJSSDK from '@kintone/kintone-js-sdk';
import Swal from 'sweetalert2';
var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');


(function (PLUGIN_ID) {
  'use strict';

  var spacersList = (objLayout) => {
    var items = [{
      label: '--------',
      value: '--------',
      isDisabled: true
    }]
    const layout = objLayout.layout

    function rowLayout(row) {
      var fieldsArray = row.fields
      fieldsArray.forEach(field => {
        // var fields = row.fields;
        if (field.type === 'SPACER') {
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
  }



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
        var textAreaVal = rowData.text;
        if (textAreaVal && this.textAreaField._reactObject) {
          textAreaField.setValue(this.textAreaVal.value);
        }
      }
    }
  };



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

//use set as well instead of counter 
//iterate through data and have a var for the set that tracks it
//if this val is included in my set let me add if it exists already, throw the error

  let duplicateVal = (data) => {
  var dupes = new Set

  }

  var updatedropDownItems = (config, initialData) => {
    var items = []
    var updatedConfigArr = []
    initialData[0].dropDown.
    items.forEach(item => {
      items.push(item.value)
    })
    config.forEach(row => {
      var newRow = JSON.parse(JSON.stringify(initialData[0]))
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
    console.log('data:', data)

    var dataJSON = JSON.stringify(data)
    var config = {
      table: dataJSON
    }

    var newData = JSON.parse(JSON.stringify(data));
    var selectedValues = newData.map(row => row.dropDown.value);
    console.log("array of selected values: ", selectedValues)


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
        })
        .then(function () {
          window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId() + '#section=settings';
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
        var newConfig = updatedropDownItems(parsedConfig, initialData)
        table.setValue(newConfig);


        table.on('cellChange', function (event) {
          console.log(event, "EVENT")
          var eventDropDownData = event.data[0].dropDown
          console.log(eventDropDownData, "Ⓜ️")
          eventDropDownData.items.forEach(index => {})
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
