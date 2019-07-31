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
      var textfield1 = new kintoneUIComponent.Text({value: rowData.text1.value});
      var textfield2 = new kintoneUIComponent.Text({value: rowData.text2.value});
      span.appendChild(textfield1.render());
      span.appendChild(textfield2.render());
      textfield1.on('change', function(newValue){
        updateRowData({text1: {value: newValue}}, false);
      });
      textfield2.on('change', function(newValue){
        updateRowData({text2: {value: newValue}}, false);
      });
      this.textfield1 = textfield1;
      this.textfield2 = textfield2;
      return span;
    },
    update: function({ rowData }) {
      var text1val = rowData.text1;
      var text2val = rowData.text2;
      if (text1val && this.textfield1._reactObject) {
        this.textfield1.setValue(text1val.value);
      }
      if (text2val && this.textfield2._reactObject) {
        this.textfield2.setValue(text2val.value);
      }
      console.log(this.textfield1)
    }
  }
};

// initial data of a table
var initialData = [
  {
    text: { value: 'text field' },
    // initial data of dropdown
    toys: {
      items: [
           {
               label: 'Data from app 1',
               value: 'cars',
               isDisabled: false
           },
           {
               label: 'Data from app 2',
               value: 'robots',
               isDisabled: false
           },
           {
               label: 'Data from app 3',
               value: 'animals',
               isDisabled: true
           },
       ],
      value: 'cars'
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
      cell: function() { return kintoneUIComponent.createTableCell('dropdown', 'toys') }
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
