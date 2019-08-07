jQuery.noConflict();

(function ($, PLUGIN_ID) {
  'use strict';
  var kintoneJSSDK = require('@kintone/kintone-js-sdk/dist/kintone-js-sdk.min');
  var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
  require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');

  //TO DO
  // request data from app => once client adds plugin to their app it should already be fetching data only from the blank fieldsv ✅
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
        //haven't used jssdk yet
  //once problem is resolved, populate fields that i need SPACER
  


  // ######################################################################################-----> Get Blank Space
 
  var findSpacers = (objLayout) => {
    var layout = objLayout.layout
    var fieldResults = []
    var elIdResults = []
   
   
    layout.forEach(row => {
      var fields = row.fields
      fields.forEach(field => {
        if (field.type === 'SPACER') {
          fieldResults.push(field)
        }
      })
    })
    console.log(fieldResults, "🦶🦶nfw")
    
    
    fieldResults.forEach(index => {
      var elIdKey = index.elementId
        // if () {}
      console.log(elIdKey, "kellysogood")
      // elIdKey.forEach(fieldResultsIndex => {
      //   console.log(Object.values(fieldResultsIndex, "🐳whale🐳")
      // )})
      
      
      
      
      
      
      
      // console.log(Object.values.elementId, "🐶")
    });
  }



  function callAPI () {
    var param = {
      'app': kintone.app.getId()
    }

    kintone.api(kintone.api.url('/k/v1/app/form/layout', true), 'GET', param, function (resp) {
      console.log(param, "🏀app id")
      // success
      console.log(resp, "🚨layout field to grab spacer types🚨");
      var spacers = findSpacers(resp)
      console.log(spacers, "💪💪💪")

      var configGET = kintone.plugin.app.getConfig(PLUGIN_ID);
        console.log(configGET, "🦁")
    }, function (error) {
      // error
      console.log(error);
    });
    // create function that will filter through resp obj and return only blank space fields ✅

    // input config is going to be the prev config settings objects and putting that in a save object

    //does the config exist?
    //if yes, populate table with the config
    //if no , populate table w form field
    //table.setvalue

  }
  callAPI()


// ####################################################################################-----> Custom Cell

  var customCell = function () {
    var textAreaInput;
    return {
      init: function ({
        rowData,
        updateRowData
      }) {
        var span = document.createElement('span');
        var textAreaField = new kintoneUIComponent.TextArea({
          value: {textAreaInput}
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


// #####################################################################################---->Data


  // initial data of a table
  var initialData = [{
    text: {
      value: 'text field'
    },
    // initial data of dropdown
    dropDown: {
      items: [{
        label: '---------',
        value: 'blank',
        isDisabled: false
      }, ],
      value: 'blank'
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
  var defaultRowData = initialData[0]
  // return this data to override default row data onRowAdd
  var overriddenRowData = initialData[0]

// #################################################################################----->Table

  var table = new kintoneUIComponent.Table({
    // initial table data
    data: initialData,
    // default row data on row add
    defaultRowData: spacers,
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

// ###########################################################################----->Set Value


var config = defaultRowData.dropDown
console.log(config,"🐶🐶🐶supposedly config")


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


  $('.kintone-titlee').text('Tooltip Label Plugin')
  $('.kintone-si-conditions').append(table.render());

})(jQuery, kintone.$PLUGIN_ID);