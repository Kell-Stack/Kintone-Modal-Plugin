jQuery.noConflict();
// from create-plugin
(function($, PLUGIN_ID) {
  'use strict';

  var $form = $('.js-submit-settings');
  var $cancelButton = $('.js-cancel-button');
  var $message = $('.js-text-message');
  var config = kintone.plugin.app.getConfig(PLUGIN_ID);

   if (config.message) {
    $message.val(config.message);
  }
  $form.on('submit', function(e) {
    e.preventDefault();
    kintone.plugin.app.setConfig({message: $message.val()}, function() {
      alert('The plug-in settings have been saved. Please update the app!');
      window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId();
    });
  });
  $cancelButton.on('click', function() {
    window.location.href = '/k/admin/app/' + kintone.app.getId() + '/plugin/';
  });

  // from create-plugin

  //config table 

  let textRow


  if (!config.hasOwnProperty('text_row_number')){
    textRow = Number(config['text_row_field']) //field code


    for (let text = 1; text < textRow + 1; text++) {
      config['text_row' + text] = JSON.parse(config['text_row' + text])
    }
  } else {
    config['body_text'] = JSON.parse(config['body_text'])
    textRow = 10
  }




  // //instantiating KEYS for Object "customCell"
  // let customCell = function (){
  //   return {
  //     init: function ({rowData, updateRowData}) {
  //       let spanTag = document.createElement('span');
  //       let textField1 = new kintoneUIComponent.Text({value: rowData.text1.value})
  //       let textField2 = new kintoneUIComponent.Text({value: rowData.text2.value})
        
  //       spanTag.appendChild(textField1.render());
  //       spanTag.appendChild(textField2.render());
  //       textField1.on('change', function(newValue){
  //         updateRowData({text1:{value:newValue}}, false);
  //       })

  //       textField2.on('change', function(newValue){
  //         updateRowData({text1:{value:newValue}}, false);

  //       })

  //       this.textField1 = textField1
  //       this.textField2 = textField2
  //       return spanTag
  //     },
  //     update: function ({rowData}){
  //       let text1Val = rowData.text1
  //       let text2Val = rowData.text2

  //       //i'm confused on ._reactObject
  //       if (text1Val && this.textField1._reactObject) {
  //         this.textField1.setValue(text.text1Val.value)
  //       }
  //       if (text2Val && this.textField2._reactObject) {
  //       }
  //     }
  //   }
  // }


  





})(jQuery, kintone.$PLUGIN_ID);