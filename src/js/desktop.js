import $ from 'jquery';
import tippy from 'tippy.js';
import image from '../image/info.png';

(function(PLUGIN_ID) {
  'use strict';

  kintone.events.on('app.record.detail.show', function(event) {
    console.log(event, "event:")
    // var config = kintone.plugin.app.getConfig(PLUGIN_ID);

      var icon = document.createElement('img')
      // icon.setAttribute('src','https://image.flaticon.com/icons/png/512/23/23765.png')
      icon.setAttribute('src',image)
      var space = kintone.app.record.getSpaceElement('newModal')
      console.log(space,"🙃")
      $(icon).attr('class', 'info-icon')
      space.appendChild(icon)
    //   tippy (icon, {content: 'tooltip'})
    // tippy(space,{content: 'Tooltip'} )


    var tippyAttr = {
      arrow: 'true', 
      placement: 'right', 
      animation: 'fade', 

      content: "Hello Georgina!!!"
    }
    tippy(space, tippyAttr)

    // tippy(space, {
    //   arrow: 'true', 
    //   placement: 'right', 
    //   animation: 'fade', 
    //   content: "Hello Georgina!!!"
    // })

  });

})(kintone.$PLUGIN_ID);


//get svg inside of desktop.js

//create element div
//set class of div (give unique id) so you can reuse it
// set inner html
//get space elemt (field code you gave space element)