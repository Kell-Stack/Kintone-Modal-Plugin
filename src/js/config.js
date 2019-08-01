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
      let param = {'app': kintone.app.getId()}
      kintone.api(kintone.api.url('/k/v1/app/form/fields', true), 'GET', param, function (resp) {
        let statusCode;
        for (let key in resp.properties){
          if (!resp.properties.hasOwnProperty(key)) {
            continue
          }

          let prop = resp.properties[key]
          if (prop.type === 'status') {
            statusCode = prop.code
            break;
          }
        }

        let newConf = {}

        console.log(param, "🏀")
        // success
        console.log(resp);
      }, function (error) {
        // error
        console.log(error);
      });
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
            console.log(textAreaField, "👽")

            span.appendChild(textAreaField.render());

            textAreaField.on('change', function (newValue) {
              console.log(newValue, "😓")
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
            console.log(this.textAreaField, "😐")
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
      }); $('.kintone-si-conditions').append(table.render());

      // $('.kintone-si-buttons').append(button.render())

    })(jQuery, kintone.$PLUGIN_ID);