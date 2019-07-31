jQuery.noConflict();

(function($, PLUGIN_ID) {
  'use strict';
  // var kintoneJSSDK = require('@kintone/kintone-js-sdk/dist/kintone-js-sdk.min');
  var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
  require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');

// NEED TO MAKE SAVE AND CANCEL BUTTON WITH ALERTS

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
    }
  }
};

// initial data of a table
var initialData = [
  {
    text: { value: 'text field' },
    text1: { value: 'text field 1' },
    text2: { value: 'text field 2' },
    // initial data of dropdown
    toys: {
      items: [
           {
               label: 'Cars',
               value: 'cars',
               isDisabled: false
           },
           {
               label: 'Robots',
               value: 'robots',
               isDisabled: false
           },
           {
               label: 'Animals',
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
var defaultRowData = {
  text: { value: 'text field' },
  text1: { value: 'text field 1' },
  text2: { value: 'text field 2' },
  // default data of dropdown
  toys: {
    items: [
         {
             label: 'Cars',
             value: 'cars',
             isDisabled: false
         },
         {
             label: 'Robots',
             value: 'robots',
             isDisabled: false
         },
         {
             label: 'Animals',
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
};

// return this data to override default row data onRowAdd
var overriddenRowData = {
  text: {value: 'overwritten field value'},
  text1: { value: 'overwritten field1 value' },
  text2: { value: 'overwritten field2 value' },
  // overriden data of dropdown
  toys: {
    items: [
         {
             label: 'Cars',
             value: 'cars',
             isDisabled: false
         },
         {
             label: 'Robots',
             value: 'robots',
             isDisabled: false
         },
         {
             label: 'Animals',
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
};

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
    {
      header: '💜Modal Text',
      cell: function() { return kintoneUIComponent.createTableCell('text', 'text') }
    },
  ]
});
    $('.settings').append(table.render());
})(jQuery, kintone.$PLUGIN_ID);
