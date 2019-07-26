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

  let textRow;

  if (!config.hasOwnProperty('text_row_number')){
    textRow = Number(config['text_row_field']) //field code


    for (let text = 1; text < textRow + 1; text++) {
      config['text_row' + text] = JSON.parse(config['text_row' + text])
    }
  } else {
    config['body_text'] = JSON.parse(config['body_text'])
    textRow = 10
  }

  $(document).ready(function() {
    let columnKeyVals = {
      'cf_table_title': 'Modal Generator',
      'cf_column1': 'Field Code',
      'cf_column2': 'Text',
      'cf_plugin_submit': 'SAVE✅',
      'cf_plugin_cancel': 'CANCEL❌',
      'cf_required_field': 'Required field is empty✏️'
      // 'cf_column3': 'Modal Position' for next iteration
    }
  })

  let configHTML = $('cf-plugin').html()
  let template = $.templates(configHTML)
  $('#cf-plugin').html(template).render()


  function checkRowNumber() {
    if ($('#')){

    }
  }

})(jQuery, kintone.$PLUGIN_ID);