
(function(PLUGIN_ID) {
  'use strict';
  
  // require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');
//    var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min');
console.log("hellllllllo"); 

  //config table 


//   let textRow;

//   if (!config.hasOwnProperty('text_row_number')){
//     textRow = Number(config['text_row_field']) //field code
//     for (let text = 1; text < textRow + 1; text++) {
//       config['text_row' + text] = JSON.parse(config['text_row' + text])
//     }
//   } else {
//     config['body_text'] = JSON.parse(config['body_text'])
//     textRow = 10
//   }

//   $(document).ready(function () {
//     let columnKeyVals = {
//       'cf_table_title': 'Modal Generator',
//       'cf_column1': 'Field Code',
//       'cf_column2': 'Text',
//       'cf_plugin_submit': 'SAVE✅',
//       'cf_plugin_cancel': 'CANCEL❌',
//       'cf_required_field': 'Required field is empty✏️'
//       // 'cf_column3': 'Modal Position' for next iteration-> top right
//     }
//   })

//   let configHTML = $('cf-plugin').html()
//   let template = $.templates(configHTML)
//   // $('#cf-plugin').html(template).render()

// // this is to check how many rules will be taking place inside the table
//   function checkRowNumber() {
//     if ($('#cf-plugin-text-tbody > tr').length === 2) {
//       $('cf-plugin-text-tbody > tr .removeList').eq(1).hide()
//     } else {
//       $('#cf-plugin-text-tbody > tr .removeList').eq(1).show()
//     }

//     if ($('#cf-plugin-date-tbody > tr').length === 2) {
//       $('#cf-plugin-date-tbody > tr .removeList').eq(1).hide()
//     } else {
//       $('#cf-plugin-date-tbody > tr .removeList').eq(1).show()
//     }
//   }

//   function setDefaultDropdownText() {
//     for (let defaulText = 1; defaulText<=text_row_field; defaulText++){
//       $('#cf-plugin-text-tbody > tr').eq(0).clone(true).insertAfter(
//         $('#cf-plugin-text-tbody > tr').eq(ti - 1)
//       )
//     }
//   }

})(kintone.PLUGIN_ID);


