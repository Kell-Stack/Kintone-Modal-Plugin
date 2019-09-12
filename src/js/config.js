import $ from 'jquery';
import * as kintoneJSSDK from '@kintone/kintone-js-sdk';
var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');
import {
  setTable
} from './table';
import {
  handleSaveButton,
  handleCancelButton
} from './handleSaveAndCancel'

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
      }

      var saveButton = new kintoneUIComponent.Button({
        text: 'Save',
        type: 'submit'
      });
      saveButton.on('click', function () {
        handleSaveButton(table)
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