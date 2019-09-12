import $ from 'jquery';
import * as kintoneJSSDK from '@kintone/kintone-js-sdk';
import Swal from 'sweetalert2';
var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');

(function (PLUGIN_ID) {
  'use strict';

  //😡invoked in settable
  var customCellTextArea = () => {
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
        var textAreaVal = rowData.text;
        if (textAreaVal && this.textAreaField._reactObject) {
          textAreaField.setValue(this.textAreaVal.value);
        }
      }
    }
  };

//😡
  //🥶invoked in getspacers
  var setTable = (initialData) => {

    var defaultRowData = JSON.parse(JSON.stringify(initialData[0]))

    var overriddenRowData = JSON.parse(JSON.stringify(initialData[0]))

    var table = new kintoneUIComponent.Table({
      data: initialData,

      defaultRowData: defaultRowData,
      onRowAdd: function (e) {
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
          header: 'Tooltip Text',
          cell: function () {
            return customCellTextArea()
          }
        }
      ]
    })
    return table
  };


  //🥶invoked in getspacers
  //udated config
  var updateddropDownItems = (config, initialData) => {
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
      }
      newRow.text.value = oldTextVal
      updatedConfigArr.push(newRow)
    })
    return updatedConfigArr
  };


  //🥰invoked in handlesave
  let missingValCheck = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].dropDown.value === '--------' || data[i].text.value === '') {
        return true
      }
    }
    return false
  };


  //🥰invoked in handlesave
  var duplicateValCheck = (data) => {
    var dupes = new Set()
    var dupeCheck = false
    data.forEach(row => {
      var rowElementId = row.dropDown.value
      if (dupes.has(rowElementId) === true) {
        dupeCheck = true
      }
      dupes.add(rowElementId)
    })
    return dupeCheck
  };

  //🥰
  //🥶invoked in getspacers
  var handleSaveClick = (table) => {
    var data = table.getValue();

    var dataJSON = JSON.stringify(data)
    var config = {
      table: dataJSON
    }

    if (duplicateValCheck(data) === true) {
      Swal.fire({
        title: '<strong>Duplicate Value</strong>',
        html: 'You can only have one tooltip per blank space field. Please delete field',
        type: 'error',
        confirmButtonText: 'Ok'
      })
    } else if (missingValCheck(data)) {
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
  };


  //🥶invoked in getspacers
  var handleCancelButton = () => {
    Swal.fire({
      title: '<strong>Cancel</strong>',
      html: 'Your changes were not saved',
      type: 'warning',
      confirmButtonText: 'Back to App Settings'
    }).then(function () {
      window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId() + '#section=settings';
    })
  };

//🥶invoked in getspacers
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
  };

  //🥶
  var getSpacer = () => {
    var connection = new kintoneJSSDK.Connection()
    var kintoneApp = new kintoneJSSDK.App(connection)

    kintoneApp.getFormLayout(kintone.app.getId(), true).then((rsp) => {
      var config = kintone.plugin.app.getConfig(PLUGIN_ID)
      var spacers = spacersList(rsp)
      var initialData = [{
        text: {
          value: ''
        },
        dropDown: {
          items: spacers,
          value: '--------'
        }
      }];
      var table = setTable(initialData)

      $('.kintone-si-conditions').append(table.render());

      if (config && config.table) {
        var parsedConfig = JSON.parse(config.table);
        var newConfig = updateddropDownItems(parsedConfig, initialData)
        table.setValue(newConfig);
        // table.on('cellChange', function (event) {
        //   var eventDropDownData = event.data[0].dropDown
        //   eventDropDownData.items.forEach(index => {})
        // })
      }

      var saveButton = new kintoneUIComponent.Button({
        text: 'Save',
        type: 'submit'
      });
      saveButton.on('click', function () {
        handleSaveClick(table)
      });

      var cancelButton = new kintoneUIComponent.Button({
        text: 'Cancel'
      });
      cancelButton.on('click', function (event) {
        handleCancelButton(table)
      });

      $(".SaveButton").append(saveButton.render())
      $(".CancelButton").append(cancelButton.render())

    }).catch((err) => {
      console.log(err);
    });
  }

  getSpacer()

})(kintone.$PLUGIN_ID);