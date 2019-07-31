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
// replace text field with textarea FROM UI-C
// make save and cancel buttons w/o function


var customCell = function() {
  return {
    init: function({rowData, updateRowData}) {
      var span = document.createElement('span');
        console.log(span,"💀")
      var textAreaField = new kintoneUIComponent.TextArea({value: rowData.textarea.value});
      console.log(textAreaField,"👽")
      span.appendChild(textAreaField.render());
      textAreaField.on('change', function(newValue){
        updateRowData({textarea: {value: newValue}}, false);
      });
      this.textarea = textarea;
      return span;
    },
    update: function({ rowData }) {
      var textAreaVal = rowData.text1;
      if (textAreaVal && this.textarea._reactObject) {
        this.textarea.setValue(text1val.value);
      }
      console.log(this.textarea)
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
var defaultRowData = initialData
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
var overriddenRowData = initialData
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
      header: 'Blank Space Element ID💜',
      cell: function() { return kintoneUIComponent.createTableCell('dropdown', 'dropDown') }
    },
    // use custom cell for textarea
    {
      header: '💜Modal Text-Custom cell contain 1 textarea',
      cell: function() { return customCell() }
    },
  ]
});
    $('.settings').append(table.render());

    
})(jQuery, kintone.$PLUGIN_ID);