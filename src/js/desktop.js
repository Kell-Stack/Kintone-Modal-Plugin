import $ from 'jquery';
import tippy from 'tippy.js';
import image from '../image/question.png';

(function (PLUGIN_ID) {
    'use strict';
    var config = kintone.plugin.app.getConfig(PLUGIN_ID)
    console.log(config, "🐼")

     const retrieveTextPerElId = (config) => {
       let items = []
       config[0].dropDown.items.forEach(item => {
         if (item.value !== "--------") {
           items.push(item.value)
         }
       })
       config.forEach(row => {
         
       })
     }

    if (config && config.table) {//--> line 282
      var parsedConfig = JSON.parse(config.table)
      console.log(parsedConfig, "🐵")
      retrieveTextPerElId(parsedConfig)

      // var newConfig = updateConfig(parsedCnfg)
      // console.log(newConfig, "🐤")
      // table.setValue(parsedConfig)
    }

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
            // iterate through config then i'll parse it for each object i will call getIcon(spacers, text)
        getIcon()

    });

})(kintone.$PLUGIN_ID);