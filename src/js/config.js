jQuery.noConflict();

(function ($, PLUGIN_ID) {
  'use strict';
  // var kintoneJSSDK = require('@kintone/kintone-js-sdk/dist/kintone-js-sdk.min');
  var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
  require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');

  // input config is going to be the prev config settings objects and putting that in a save object

  //TO DO
  // request data from app => once client adds plugin to their app it should already be fetching data only from the blank fields
  // make save and cancel buttons w/o function ✅
  // make api call request to layout api

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



  function getBlankFields() {
    let param = {
      'app': kintone.app.getId()
    }
    kintone.api(kintone.api.url('/k/v1/app/form/layout', true), 'GET', param, function (resp) {
      console.log(param, "🏀app id")
      // success
      console.log(resp, "skrrrrrrt🚨🚨🚨🚨skrrrrrrt");
    }, function (error) {
      // error
      console.log(error);
    });


    //from the resp you want the blank field element id (this type is SPACER)
    // layout: Array(7)
    // 0:
    // fields: Array(2)
    // 0: {type: "LABEL", label: "<div><div style="text-align:left"><b><font size="6">Daily Lunch Orders</font></b></div></div>", size: {…}}
    // 1:
    // elementId: "titleModal"
    // size: {width: "117", height: "66"}
    // type: "SPACER"
    // __proto__: Object
    // length: 2
    // __proto__: Array(0)
    // type: "ROW"
    // __proto__: Object

    // create function that wil filter through resp obj and return only blank space fields

    //user sign in getConfig
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

      //once user saves you will setConfig
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

  var elId = modal;

  var config = {
    layout: [{
      type: "SPACER",
      elementId: elId,
      
    }]
  }
  console.log(config, "yerrrrrrr boyyyy")
  kintone.plugin.app.setConfig(config)

  var savebutton = new kintoneUIComponent.Button({
    text: 'will be a save button😳'
  });
  var bodySB = document.getElementsByTagName("BODY")[0];
  bodySB.appendChild(savebutton.render());
  savebutton.on('click', function (event) {
    console.log('on save click');
  });

  var cancelbutton = new kintoneUIComponent.Button({
    text: 'will be a cancel button😳'
  });
  var bodyCB = document.getElementsByTagName("BODY")[0];
  bodyCB.appendChild(cancelbutton.render());
  cancelbutton.on('click', function (event) {
    console.log('on cancel click');
  });

  $('.kintone-titlee').text('SUWOOO')
  $('.kintone-si-conditions').append(table.render());

})(jQuery, kintone.$PLUGIN_ID);