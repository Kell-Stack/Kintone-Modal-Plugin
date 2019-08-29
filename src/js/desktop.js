import $ from 'jquery';
import tippy from 'tippy.js';
import image from '../image/question.png';

(function (PLUGIN_ID) {
  'use strict';

  const getIcon = () => {
    var config = kintone.plugin.app.getConfig(PLUGIN_ID)
    console.log(config,"config 🔴")
    var parsedConfig = JSON.parse(config.table);
    parsedConfig.forEach(index => {
      var elementId = index.dropDown.value
      var text = index.text.value

      var icon = document.createElement('img')
      icon.setAttribute('src', image)

      var spacer = kintone.app.record.getSpaceElement(elementId)

      console.log(spacer, "🙃")

      $(icon).attr('class', 'info-icon')
      spacer.appendChild(icon)

      var tippyAttr = {
        placement: 'top',
        animation: 'fade',
        theme: 'light-border',
        inertia: 'true',
        animation: 'scale',
        content: text,
      }
      tippy(spacer, tippyAttr)
    })
  }

  kintone.events.on('app.record.detail.show', function (event) {
    console.log(event, "event:")
    // iterate through config then i'll parse it for each object i will call getIcon(spacers, text)
    getIcon()

  });

})(kintone.$PLUGIN_ID);