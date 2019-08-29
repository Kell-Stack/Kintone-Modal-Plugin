import $ from 'jquery';
import tippy from 'tippy.js';
import image from '../image/question.png';

(function (PLUGIN_ID) {
  'use strict';

  var config = kintone.plugin.app.getConfig(PLUGIN_ID)

  const retrieveTextPerElId = (config) => {
    var items = []
    config.forEach(index => {
      var elementId = index.dropDown.value
      var text = index.text.value
      var getIcon = (elementId, text) => {

        // console.log(retrieveTextPerElId(parsedConfig), "ysrsrsyrs")
        // retrieveTextPerElId(parsedConfig).forEach(row => {
        //   var elementId = row.elementId
        // })
    
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
      
      // var obj = {}
      // obj.elementId = elementId
      // obj.text = text
      // items.push(obj)
    })
    // console.log(items, "Ⓜ️")
    // return items
  }

  // if (config && config.table) {
  //   var parsedConfig = JSON.parse(config.table)
  //   console.log(parsedConfig, "🐵")
  //   retrieveTextPerElId(parsedConfig)
  // }



  kintone.events.on('app.record.detail.show', function (event) {
    console.log(event, "event:")
    // iterate through config then i'll parse it for each object i will call getIcon(spacers, text)
    getIcon()

  });

})(kintone.$PLUGIN_ID);