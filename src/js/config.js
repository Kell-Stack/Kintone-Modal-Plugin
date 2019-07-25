// jQuery.noConflict();

// (function($, PLUGIN_ID) {
//   'use strict';

//   var $form = $('.js-submit-settings');
//   var $cancelButton = $('.js-cancel-button');
//   var $message = $('.js-text-message');
//   var config = kintone.plugin.app.getConfig(PLUGIN_ID);
//   console.log(config)

//   if (config.message) {
//     $message.val(config.message);
//   }
//   $form.on('submit', function(e) {
//     e.preventDefault();
//     console.log("😎😎😎",{message: $message.val()})
//     kintone.plugin.app.setConfig({message: $message.val()}, function() {
//       alert('The plug-in settings have been saved. Please update the app!');
//       window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId();
//     });
//   });
//   $cancelButton.on('click', function() {
//     window.location.href = '/k/admin/app/' + kintone.app.getId() + '/plugin/';
//   });
// })(jQuery, kintone.$PLUGIN_ID);

(function(){
  // custom cell containing 2 text fields
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
      // initial data of radio buttons
      fruit: {
        name: 'fruit',
        items: [
             {
                 label: 'Orange',
                 value: 'Orange',
                 isDisabled: false
             },
             {
                 label: 'Banana',
                 value: 'Banana',
                 isDisabled: true
             },
             {
                 label: 'Lemon',
                 value: 'Lemon',
                 isDisabled: true
             },
         ],
        value: 'Banana'
      },
      // initial data of multiple choices
      colors: {
        items: [
             {
                 label: 'Red',
                 value: 'red',
                 isDisabled: false
             },
             {
                 label: 'Green',
                 value: 'green',
                 isDisabled: true
             },
             {
                 label: 'Blue',
                 value: 'blue',
                 isDisabled: true
             },
         ],
        value: ['red']
      },
      // initial data of checkbox
      vegetables: {
        items: [
             {
                 label: 'Potato',
                 value: 'potato',
                 isDisabled: false
             },
             {
                 label: 'Celery',
                 value: 'celery',
                 isDisabled: false
             },
             {
                 label: 'Carrot',
                 value: 'carrot',
                 isDisabled: true
             },
         ],
        value: ['potato', 'celery']
      },
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
    // default data of radio buttons
    fruit: {
      name: 'fruit',
      items: [
           {
               label: 'Orange',
               value: 'Orange',
               isDisabled: false
           },
           {
               label: 'Banana',
               value: 'Banana',
               isDisabled: true
           },
           {
               label: 'Lemon',
               value: 'Lemon',
               isDisabled: true
           },
       ],
      value: 'Banana'
    },
    // default data of multiple choices
    colors: {
      items: [
           {
               label: 'Red',
               value: 'red',
               isDisabled: false
           },
           {
               label: 'Green',
               value: 'green',
               isDisabled: true
           },
           {
               label: 'Blue',
               value: 'blue',
               isDisabled: true
           },
       ],
      value: ['red']
    },
    // default data of checkbox
    vegetables: {
      items: [
           {
               label: 'Potato',
               value: 'potato',
               isDisabled: false
           },
           {
               label: 'Celery',
               value: 'celery',
               isDisabled: true
           },
           {
               label: 'Carrot',
               value: 'carrot',
               isDisabled: true
           },
       ],
      value: ['potato', 'celery']
    },
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
    // overriden data of radio buttons
    fruit: {
      name: 'fruit',
      items: [
           {
               label: 'Orange',
               value: 'Orange',
               isDisabled: true
           },
           {
               label: 'Banana',
               value: 'Banana',
               isDisabled: false
           },
           {
               label: 'Lemon',
               value: 'Lemon',
               isDisabled: false
           },
       ],
      value: 'Banana'
    },
    // overriden data of multiple choices
    colors: {
      items: [
           {
               label: 'Red',
               value: 'red',
               isDisabled: false
           },
           {
               label: 'Green',
               value: 'green',
               isDisabled: true
           },
           {
               label: 'Blue',
               value: 'blue',
               isDisabled: true
           },
       ],
      value: ['red']
    },
    // overriden data of checkbox
    vegetables: {
      items: [
           {
               label: 'Potato',
               value: 'potato',
               isDisabled: false
           },
           {
               label: 'Celery',
               value: 'celery',
               isDisabled: true
           },
           {
               label: 'Carrot',
               value: 'carrot',
               isDisabled: false
           },
       ],
      value: ['potato', 'celery']
    },
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
        header: 'Text',
        cell: function() { return kintoneUIComponent.createTableCell('text', 'text') }
      },
      {
        header: 'Radio',
        cell: function() { return kintoneUIComponent.createTableCell('radio', 'fruit') }
      },
      {
        header: 'Multichoice',
        cell: function() { return kintoneUIComponent.createTableCell('multichoice', 'colors') }
      },
      {
        header: 'Checkbox',
        cell: function() { return kintoneUIComponent.createTableCell('checkbox', 'vegetables') }
      },
      {
        header: 'Dropdown',
        cell: function() { return kintoneUIComponent.createTableCell('dropdown', 'toys') }
      },
      {
        header: 'Label',
        cell: function() { return kintoneUIComponent.createTableCell('label', 'label') }
      },
      {
        header: 'Icon Button',
        cell: function() { return kintoneUIComponent.createTableCell('icon', 'iconBtn', {onClick:function(event){
          alert('icon button clicked')
        }}) }
      },
      {
        header: 'Alert',
        cell: function() { return kintoneUIComponent.createTableCell('alert', 'alert') }
      },
      {
        header: 'Custom cell contains 2 textfields',
        cell: function() { return customCell() }
      },
    ]
  });
  kintone.app.getHeaderSpaceElement().appendChild(table.render());
})();