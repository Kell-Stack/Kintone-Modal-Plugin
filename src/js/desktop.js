import $ from 'jquery';
import tippy from 'tippy.js';
var kintoneUIComponent = require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.js');
require('modules/@kintone/kintone-ui-component/dist/kintone-ui-component.min.css');
import image from '../image/question.png';
import image2 from '../image/information-circular-button-interface-symbol.png';
import image3 from '../image/information-web-circular-button-symbol.png';
import image4 from '../image/information-button.png';
import {selectedSpacersAndText} from './config';

(function (PLUGIN_ID) {
  'use strict';


  const throwPluginNotConfiguredAlert = () => {
    selectedSpacersAndText()
    //   if() {

    // }

    kintone.api(kintone.api.url('/k/v1/app', true), 'GET', {
      "id": kintone.app.getId()
    }, function (resp) {
      var alert = new kintoneUIComponent.Alert({
        text: 'A \'Blank Space\' does not exist as a field in form settings anymore. Please contact the app\'s administrator ' + resp.creator.name + ' or ' + resp.modifier.name,
      });
      var header = kintone.app.getHeaderSpaceElement()
      header.appendChild(alert.render())
      alert.setType("error")
    }, function (error) {
      console.log(error);
    });
  }

  // throwPluginNotConfiguredAlert()
  // if () {
  // kintone.throwPluginNotConfiguredAlert()
  // }


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