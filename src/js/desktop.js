import $ from 'jquery';
import tippy from 'tippy.js';
var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');
import image from '../image/question.png';
import image2 from '../image/information-circular-button-interface-symbol.png';
import image3 from '../image/information-web-circular-button-symbol.png';
import image4 from '../image/information-button.png';

(function (PLUGIN_ID) {
  'use strict';

  const throwPluginNotConfiguredAlert = () => {
   
    var sendToPluginSettings = () => {
      var headerLink = document.createElement('a')
      console.log('headerLink', "🤩")
      headerLink.setAttribute('href', "kbfkbkbdkhfb")
      window.location.href = '/k/admin/app/' + kintone.app.getId() + '/plugin/#/';
    }
    
    var alert = new kintoneUIComponent.Alert({
      text: 'Tooltip Label plug-in is not configured yet.'
    });
    var header = kintone.app.getHeaderSpaceElement()
    header.appendChild(alert.render())
    alert.setType("error")
    alert.on('click', function (event) {
      sendToPluginSettings()
    })
  }

    //if tooltip config has no data throw error message

  // if () {
  //   console.log('if tooltip config has no data throw error message')
  // }

  throwPluginNotConfiguredAlert()

  const getIcon = () => {

    var config = kintone.plugin.app.getConfig(PLUGIN_ID)

    var parsedConfig = JSON.parse(config.table);
    parsedConfig.forEach(index => {
      var elementId = index.dropDown.value
      var text = index.text.value

      var icon = document.createElement('img')
      icon.setAttribute('src', image4)

      var spacer = kintone.app.record.getSpaceElement(elementId)

      $(icon).attr('class', 'info-icon')
      spacer.appendChild(icon)

      var tippyAttr = {
        placement: 'top',
        // animation: 'fade',
        theme: 'light-border',
        inertia: 'true',
        animation: 'scale',
        animateFill: false,
        content: text,
      }
      tippy(spacer, tippyAttr)
    })
  }

  kintone.events.on('app.record.detail.show', function (event) {
    getIcon()
  });

})(kintone.$PLUGIN_ID);