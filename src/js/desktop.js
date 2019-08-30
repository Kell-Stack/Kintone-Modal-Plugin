import $ from 'jquery';
import tippy from 'tippy.js';
import image from '../image/question.png';
import image2 from '../image/information-circular-button-interface-symbol.png';
import image3 from '../image/information-web-circular-button-symbol.png';
import image4 from '../image/information-button.png';

(function (PLUGIN_ID) {
  'use strict';

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