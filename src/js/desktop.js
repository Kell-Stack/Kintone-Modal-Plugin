import $ from 'jquery';
import tippy from 'tippy.js';
import image from '../image/question.png';

(function(PLUGIN_ID) {
  'use strict';

  kintone.events.on('app.record.detail.show', function(event) {
    console.log(event, "event:")

      var icon = document.createElement('img')
      icon.setAttribute('src',image)


      var spacer = kintone.app.record.getSpaceElement('newModal')
      console.log(space,"🙃")


      $(icon).attr('class', 'info-icon')
      spacer.appendChild(icon)

    var tippyAttr = {
      placement: 'top', 
      animation: 'fade', 
      theme: 'light-border',
      content: "Hello Georgina!!!",
      inertia: 'true',
      animation: 'scale'
    }
    tippy(spacer, tippyAttr)
  });

})(kintone.$PLUGIN_ID);
