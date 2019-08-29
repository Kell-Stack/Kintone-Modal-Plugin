import $ from 'jquery';
import tippy from 'tippy.js';
import image from '../image/question.png';

(function (PLUGIN_ID) {
    'use strict';
    //getConfig 

    //if (config && config.table) --> line 282

    var getIcon = (elementId,text) => {
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
  
  }

    kintone.events.on('app.record.detail.show', function (event) {
        console.log(event, "event:")
            // iterate through config then i'll parse it for each object i will call getIcon(spacers val, text val)
        getIcon()

    });

})(kintone.$PLUGIN_ID);