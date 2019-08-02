jQuery.noConflict();

(function ($, PLUGIN_ID) {
  'use strict';
  // var kintoneJSSDK = require('@kintone/kintone-js-sdk/dist/kintone-js-sdk.min');
  var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
  require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');

  // NEED TO MAKE SAVE AND CANCEL BUTTON WITH ALERTS
  // what is ._reactObject ? => checking if value exists inside object 
  // do i need an overridden section
  // form field will it provide the blank spaces? can we just use the elemen t id
  // input config is going to be the prev config settings objects and putting that in a save object

  //TO DO
  // request data from app => once client adds plugin to their app it should already be fetching data only from the blank fields
  // make save and cancel buttons w/o function

  //PSEUDO CODE

  // A. App initialization: 
  //  1. Get data from the API 

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

  var config = kintone.plugin.app.getConfig(PLUGIN_ID);


  function getBlankFields() {
    let param = {
      'app': kintone.app.getId()
    }
    kintone.api(kintone.api.url('/k/v1/app/form/fields', true), 'GET', param, function (resp) {
      for (let key in resp.properties) {
        if (!resp.properties.hasOwnProperty(key)) {
          continue
        }
        var statusCode;
        var prop = resp.properties[key]
        if (prop.type === 'status') {
          statusCode = prop.code
          break;
        }
      console.log(statusCode,"🙀")
      }
      console.log(param, "🏀app id")
      // success
      console.log(resp,"skrrrrrrt🚨skrrrrrrt");
    }, function (error) {
      // error
      console.log(error);
    });

    //from the resp you want the blank field element id

    kintone.events.on('app.record.detail.show', function(event) {

    }
  }



  getBlankFields()

  var customCell = function () {
    return {
      init: function ({
        rowData,
        updateRowData
      }) {
        var span = document.createElement('span');
        var textAreaField = new kintoneUIComponent.TextArea({
          value: "⛩⛩⛩⛩⛩"
        });
        console.log(textAreaField, "👽text area object")

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
        console.log(this.textAreaField, "😐update text area object")
      }
    }
  };

  // initial data of a table
  var initialData = [{
    text: {
      value: 'text field'
    },
    // initial data of dropdown
    dropDown: {
      items: [{
          label: 'Data from app 1',
          value: 'd1',
          isDisabled: false
        },
        {
          label: 'Data from app 2',
          value: 'd2',
          isDisabled: false
        },
        {
          label: 'Data from app 3',
          value: 'd3',
          isDisabled: true
        },
      ],
      value: 'd2'
    },
    label: {
      text: 'Name',
      textColor: '#e74c3c',
      backgroundColor: 'yellow',
      isRequired: true
    },
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
  var defaultRowData = initialData[0]

  // return this data to override default row data onRowAdd
  var overriddenRowData = initialData[0]

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
        header: '💜Modal Text-Custom cell contain 1 textarea',
        cell: function () {
          return customCell()
        }
      }
    ]
  });

  var savebutton = new kintoneUIComponent.Button({
    text: 'will be a save button😳'
  });
  var body = document.getElementsByTagName("BODY")[0];
  body.appendChild(savebutton.render());
  savebutton.on('click', function (event) {
    console.log('on click');
  });

  var cancelbutton = new kintoneUIComponent.Button({
    text: 'will be a cancel button😳'
  });
  var body = document.getElementsByTagName("BODY")[0];
  body.appendChild(cancelbutton.render());
  cancelbutton.on('click', function (event) {
    console.log('on click');
  });

  $('.kintone-si-conditions').append(table.render());

  // function button () {
  //   let cancelButton = new kintoneUIComponent.Button({
  //     text: 'Cancel🚦'
  //   });
  //   let bodyCancel = document.getElementsByTagName("BODY")[0];
  //   bodyCancel.appendChild(cancelButton.render());
  //   button.on("click", function(event(){
  //     console.log('on click')
  //   });

  //   let saveButton = new kintoneUIComponent.Button({
  //     text: '🚥SAVE'
  //   });
  //   let bodySave = document.getElementsByTagName("BODY")[0];
  //   bodySave.appendChild(saveButton.render());
  // }

  // $('.kintone-si-buttons').body.appendChild(saveButton.render());

  // function buttons() {
  //   var cancelButton = new kintoneUIComponent.Button({
  //     text: 'Cancel button😳'
  //   });
  //   var body = document.getElementsByTagName("BODY")[0];
  //   body.appendChild(cancelButton.render());
  //   cancelButton.on('click', function (event) {
  //     console.log('cancel button on click');
  //   });

  //   var submitButton = new kintoneUIComponent.Button({
  //     text: '😳Submit button'
  //   });
  //   var body = document.getElementsByTagName("BODY")[0];
  //   body.appendChild(submitButton.render());
  //   submitButton.on('click', function (event) {
  //     console.log('submit button on click');
  //   });

  //     $('.kintone-si-buttons').body.appendChild(buttons.render());
  // }

})(jQuery, kintone.$PLUGIN_ID);