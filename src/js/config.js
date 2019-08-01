jQuery.noConflict();

(function($, PLUGIN_ID) {
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

// A. App initialisation:
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

let body = {
  "app": 47
}


kintone.api(kintone.api.url('/k/v1/app/form/fields', true), 'GET', body, function(resp) {
  // success
  console.log(resp);
}, function(error) {
  // error
  console.log(error);
});

var customCell = function() {
  return {
    init: function({rowData, updateRowData}) {
      var span = document.createElement('span');
      var textAreaField = new kintoneUIComponent.TextArea({value: 'textarea'}); 
        console.log(textAreaField,"👽")
      
      span.appendChild(textAreaField.render());

      textAreaField.on('change', function(newValue){
        console.log(newValue,"😓")
        updateRowData( {textarea: {value: newValue}} , false);
      });
      this.textAreaField = textAreaField;
      return span;
    },
    update: function({ rowData }) {
      var textAreaVal = rowData.textAreaField; // or ({value: rowData.textarea.value}) ??
      if (textAreaVal && this.textAreaField._reactObject) {
        this.textAreaField.getValue(textAreaVal.value);
      }
      console.log(this.textAreaField, "😐")
    }
  }
};

// initial data of a table
var initialData = [
  {
    text: { value: 'text field' },
    // initial data of dropdown
    dropDown: {
      items: [
           {
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
      color:'blue',
      size: 'small'
    },
    alert: {
      text: 'Network error',
      type: 'error'
    }
  },
];

// default row data of a table, this data will be used to create new row
var defaultRowData = initialData[0]
// {
//   text: { value: '😍text😍' },
//   // default data of dropdown
//   toys: {
//     items: [
//          {
//              label: 'App Field 1',
//              value: 'one',
//              isDisabled: false
//          },
//          {
//              label: 'App Field 2',
//              value: 'two',
//              isDisabled: false
//          },
//          {
//              label: 'App Field 3',
//              value: 'three',
//              isDisabled: true
//          },
//      ],
//     value: 'one'
//   },
//   label: {
//     text: 'Name',
//     textColor: '#e74c3c',
//     backgroundColor: 'yellow',
//     isRequired: true
//   },
//   iconBtn: {
//     type: 'insert',
//     color:'blue',
//     size: 'small'
//   },
//   alert: {
//     text: 'Network error',
//     type: 'error'
//   }
// };

// return this data to override default row data onRowAdd
var overriddenRowData = initialData[0]
// {
//   text: {value: 'overwritten❌'},
//   // overriden data of dropdown
//   toys: {
//     items: [
//          {
//              label: 'This will',
//              value: 'one',
//              isDisabled: false
//          },
//          {
//              label: 'be what is mapped over',
//              value: 'two',
//              isDisabled: false
//          },
//          {
//              label: 'in all the apps that use this plugin',
//              value: 'three',
//              isDisabled: true
//          },
//      ],
//     value: 'two'
//   },
//   label: {
//     text: 'Name',
//     textColor: '#e74c3c',
//     backgroundColor: 'yellow',
//     isRequired: true
//   },
//   iconBtn: {
//     type: 'insert',
//     color:'blue',
//     size: 'small'
//   },
//   alert: {
//     text: 'Network error',
//     type: 'error'
//   }
// };

// var table = new kintoneUIComponent.Table({
//   // initial table data
//   data: initialData,
//   //default row data on row add
//   defaultRowData: initialData,
//   onRowAdd: function(e) {
//     //console.log('table.onAdd', e);
//     // if onRowAdd does not return anything defaultRowData will be used to create new table row
//     // if below row data is returned it will override defaultRowData to be used to create new table row
//     return JSON.parse(JSON.stringify(initialData));
//   },
//   columns: [
//     {
//       header: 'Blank Space Element ID💜',
//       cell: function() { return kintoneUIComponent.createTableCell('dropdown', 'dropDown') }
//     },
//     // use custom cell for textarea
//     {
//       header: '💜Modal Text-Custom cell contain 1 textarea',
//       cell: function() { return customCell() }
//     },
//   ]
// });

var table = new kintoneUIComponent.Table({
  // initial table data
  data: initialData,
  // default row data on row add
  defaultRowData: defaultRowData,
  onRowAdd: function(e) {
    console.log('table.onAdd', e);
    // if onRowAdd does not return anything, defaultRowData will be used to create new table row
    // if below row data is returned, it will override defaultRowData to be used to create new table row
    return JSON.parse(JSON.stringify(overriddenRowData));
  },
  columns: [
    {
      header: 'Dropdown',
      cell: function() { return kintoneUIComponent.createTableCell('dropdown', 'dropDown') }
    },
    {
      header: 'Custom cell contains 2 textfields',
      cell: function() { return customCell() }
    }
  ]
});
    $('.kintone-si-conditions').append(table.render());

    // $('.kintone-si-buttons').append(table.render())
    
})(jQuery, kintone.$PLUGIN_ID);