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
    }

    // table where custcell is either use initial or config

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
          var _self = this;
          console.log('rowData:', rowData)
          var textAreaVal = rowData.text; // or ({value: rowData.textarea.value}) ??
          console.log('📸textAreaVal', textAreaVal)
          console.log("react obj", _self.textAreaField._reactObject)
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


    let checkMissingVal = (data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].dropDown.value === '--------' || data[i].text.value === '') {
          return true
        }
      }
      return false
    }

    let duplicateVal = (data) => {
      for (let i = 0; i < data.length; i++) {
        var getdataFunc = data.getValue();
        //if the dropdown item has been chosen on a prev row
        var dropdownVal = getdataFunc.dropDown.value
        var findDupe = dropdownVal.map((elementid) => {
          return  {
            count: 1,
            elementid: elementid
          }
        }).reduce((dropdown, val) => {
          dropdown[val.elementid] = (dropdown[val.elementid] || 0) + val.count
          return dropdown
        }, {})

        var dupe =  Object.keys(findDupe).filter((dropdown) => findDupe[dropdown] > 1)
        }
        return dupe
      }

        // if (findDupe) {


        // }
        // checkDupe.forEach(index => {
        //   if(checkDupe.filter(dupe => ))
        // })
        // let dropdowndataObj = {}
        // return data.filter(item => {
        //   return dropdowndataObj.hasOwnProperty(item) ? false : (dropdowndataObj[item] = true)
        // })



      var handleSaveClick = (table) => {
        console.log(table, "HELLO");
        var data = table.getValue();
        console.log('🍯data:', data)

        var checkDupe = duplicateVal(data)
        checkDupe.values()
        for (const value of checkDupe) {
          console.log(value, "👘")
        }

        var dataJSON = JSON.stringify(data)
        var config = {
          table: dataJSON
        }
        // initial data is disabled but you can still type in the box and save it with ----, error message
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


        function getSpacer() {
          var connection = new kintoneJSSDK.Connection()
          var kintoneApp = new kintoneJSSDK.App(connection)


          //does config exist
          kintoneApp.getFormLayout(kintone.app.getId(), true).then((rsp) => {
            var config = kintone.plugin.app.getConfig(PLUGIN_ID)
            var spacers = spacersList(rsp)
            var table = setTable(spacers)
            table.on('cellChange', function (event) {
              console.log(event, "🐒")
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